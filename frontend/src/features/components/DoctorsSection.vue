<template>
  <section id="doctors" class="section-y bg-warm-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 anim-scroll">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('nav.doctors') }}</span>
        <h2 class="section-title font-display font-bold text-warm-900 mt-3 mb-4">{{ $t('doctors.title') }}</h2>
        <p class="text-warm-500">{{ $t('doctors.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <article
          v-for="(doc, i) in localizedDoctors"
          :key="doc.id"
          class="anim-scroll group card-hover fluid-panel flex h-full flex-col rounded-lg p-4"
          :class="'delay-' + (i % 3 + 1)"
        >
          <div class="rounded-lg border border-warm-200 bg-warm-50 p-2 shadow-inner">
            <div class="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
              <img
                :src="doc.photo"
                :alt="doc.name"
                class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              >
              <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-warm-900/70 to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                <span class="inline-flex rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm backdrop-blur">
                  {{ doc.specialty }}
                </span>
                <span class="inline-flex items-center gap-1 rounded-lg bg-accent-400 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  <i class="fas fa-star text-[10px]"></i>
                  {{ doc.rating }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-1 flex-col pt-5">
            <h3 class="font-display text-xl font-bold leading-tight text-warm-900">Dr. {{ doc.name }}</h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                <i class="fas fa-award text-[10px]"></i>
                {{ doc.experience }} {{ $t('stats.experience').toLowerCase() }}
              </span>
              <span class="inline-flex items-center gap-1 rounded-lg bg-warm-100 px-3 py-1 text-xs font-semibold text-warm-600">
                <i class="fas fa-users text-[10px]"></i>
                {{ doc.patients }}
              </span>
            </div>

            <p class="mt-4 line-clamp-2 text-sm leading-relaxed text-warm-500">{{ doc.bio }}</p>

            <div v-if="doc.email || doc.phone" class="mt-4 grid gap-2 rounded-lg bg-warm-50 p-3 text-xs">
              <a
                v-if="doc.email"
                :href="`mailto:${doc.email}`"
                class="grid grid-cols-[1rem_1fr] items-center gap-2 font-semibold text-warm-600 transition-colors hover:text-primary-700"
              >
                <i class="fas fa-envelope text-primary-500"></i>
                <span class="truncate">{{ doc.email }}</span>
              </a>
              <a
                v-if="doc.phone"
                :href="phoneHref(doc.phone)"
                class="grid grid-cols-[1rem_1fr] items-center gap-2 font-semibold text-warm-600 transition-colors hover:text-primary-700"
              >
                <i class="fas fa-phone text-primary-500"></i>
                <span>{{ doc.phone }}</span>
              </a>
            </div>

            <div class="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-5">
              <button @click="handleBook()" class="btn-primary rounded-lg px-4 py-2.5 text-sm font-semibold">
                {{ $t('nav.appointment') }}
              </button>
              <button
                @click="showDoctor(doc)"
                class="flex h-10 w-10 items-center justify-center rounded-lg border border-warm-200 bg-white text-warm-500 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-600 hover:shadow-md"
                :title="`Voir les informations du Dr. ${doc.name}`"
                :aria-label="`Voir les informations du Dr. ${doc.name}`"
              >
                <i class="fas fa-info"></i>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHomeContent } from '../../shared/composables/useHomeContent'
import type { ContentLocale, DoctorDisplay } from '../services/homeContentService'
const { locale } = useI18n()

const { content } = useHomeContent()
const currentLocale = computed(() => locale.value as ContentLocale)

const localizedDoctors = computed<DoctorDisplay[]>(() =>
    (content.value?.doctors ?? []).map((doctor) => ({
      ...doctor,
      photo: doctor.photo || '',
      ...doctor.locales[currentLocale.value]
    }))
)

function handleBook() {
  window.appModals?.openAppointment?.()
}

function showDoctor(doc: DoctorDisplay) {
  window.appModals?.openDoctorDetail?.(doc)
}

function phoneHref(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.startsWith('237') ? `tel:+${cleaned}` : `tel:+237${cleaned}`
}
</script>
