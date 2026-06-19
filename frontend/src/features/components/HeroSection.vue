<template>
  <section id="home" class="relative min-h-[76svh] overflow-hidden bg-warm-900">
    <img
        :src="exterieurImage"
        alt="Extérieur de la Clinique Angelo"
        class="absolute inset-0 h-full w-full object-cover"
    />

    <div class="absolute inset-0 bg-gradient-to-r from-warm-900/95 via-primary-900/80 to-primary-700/35"></div>
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-warm-100/50 to-transparent"></div>

    <div class="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:min-h-[82svh] lg:px-8 lg:py-28">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-md sm:px-4">
          <span class="h-2 w-2 animate-pulse rounded-full bg-accent-400"></span>
          <span class="text-xs font-semibold text-primary-50 sm:text-sm">
            {{ $t('hero.badge') }}
          </span>
        </div>

        <h1 class="hero-title mt-5 mb-5 font-display text-4xl font-black leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          {{ $t('hero.title') }}<br />
          <span class="text-accent-300">{{ $t('hero.titleAccent') }}</span>
        </h1>

        <p class="mb-8 max-w-2xl text-base leading-relaxed text-primary-50/90 sm:text-lg">
          {{ $t('hero.description') }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
              @click="handleBook"
              class="btn-accent inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold sm:px-7 sm:text-base"
          >
            <i class="fas fa-calendar-check"></i>
            {{ $t('hero.bookBtn') }}
          </button>

          <a
              href="#services"
              class="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-xl sm:px-7 sm:text-base"
          >
            <i class="fas fa-stethoscope"></i>
            {{ $t('hero.servicesBtn') }}
          </a>
        </div>

        <div class="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:gap-4">
          <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <div class="font-display text-3xl font-bold text-white">
              {{ heroStats.doctors?.value || '+15' }}
            </div>
            <div class="mt-1 text-sm text-primary-50/80">
              {{ heroStats.doctors ? (locale === 'en' ? heroStats.doctors.labelEn || heroStats.doctors.label : heroStats.doctors.label) : $t('hero.doctors') }}
            </div>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
            <div class="font-display text-3xl font-bold text-white">
              {{ heroStats.patients?.value || '+10k' }}
            </div>
            <div class="mt-1 text-sm text-primary-50/80">
              {{ heroStats.patients ? (locale === 'en' ? heroStats.patients.labelEn || heroStats.patients.label : heroStats.patients.label) : $t('hero.patients') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import exterieurImage from '../../assets/images/clinic/exterieur.png'
import { useHomeContent } from '../../shared/composables/useHomeContent'

const { locale } = useI18n()
const { content } = useHomeContent()

const heroStats = computed(() => {
  const stats = content.value?.stats ?? []
  return {
    patients: stats[0],
    doctors: stats[1]
  }
})

function handleBook() {
  window.appModals?.openAppointment?.()
}
</script>