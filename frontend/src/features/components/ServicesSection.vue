<template>
  <section id="services" class="section-y bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="anim-scroll mx-auto mb-10 max-w-3xl text-center sm:mb-14">
        <span class="text-sm font-semibold uppercase tracking-widest text-primary-500">
          {{ $t('nav.services') }}
        </span>

        <h2 class="section-title font-display mt-3 mb-4 font-bold text-warm-900">
          {{ $t('services.title') }}
        </h2>

        <p class="text-base text-warm-500 sm:text-lg">
          {{ $t('services.description') }}
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <button
            v-for="service in localizedServices"
            :key="service.name"
            type="button"
            class="group rounded-2xl border border-warm-200 bg-gradient-to-br from-primary-50 via-white to-warm-50 p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
            @click="openServiceDetails(service)"
        >
          <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
              :class="service.bgClass"
          >
            <i :class="service.icon" class="text-xl" :style="{ color: service.color }"></i>
          </div>

          <h3 class="font-display text-xl font-bold text-warm-900">
            {{ service.displayName }}
          </h3>

          <p class="mt-3 line-clamp-3 text-sm leading-relaxed text-warm-500">
            {{ service.displayDesc }}
          </p>

          <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
            Voir les détails
            <i class="fas fa-arrow-right text-xs transition group-hover:translate-x-1"></i>
          </span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
          v-if="selectedService"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          @click.self="closeServiceDetails"
      >
        <div class="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
          <div class="grid gap-6 p-5 sm:p-8 lg:grid-cols-[300px_1fr]">
            <div
                v-if="selectedService.hasModalImage"
                class="overflow-hidden rounded-2xl border border-warm-200 bg-warm-100"
            >
              <img
                  :src="selectedService.image"
                  :alt="selectedService.displayName"
                  class="h-72 w-full object-cover lg:h-full"
              />
            </div>

            <div
                v-else
                class="flex min-h-[280px] flex-col justify-between rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-warm-50 p-6"
            >
              <div>
                <div
                    class="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm"
                    :class="selectedService.bgClass"
                >
                  <i
                      :class="selectedService.icon"
                      class="text-2xl"
                      :style="{ color: selectedService.color }"
                  ></i>
                </div>

                <p class="text-sm font-semibold text-primary-700">
                  Service spécialisé
                </p>

                <h3 class="mt-2 font-display text-2xl font-bold text-warm-900">
                  {{ selectedService.displayName }}
                </h3>
              </div>

              <p class="mt-6 text-sm leading-7 text-warm-600">
                {{ selectedService.displayDesc }}
              </p>
            </div>

            <div>
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold text-primary-700">
                    Service médical
                  </p>

                  <h2 class="mt-2 text-2xl font-bold text-warm-900 sm:text-3xl">
                    {{ selectedService.displayName }}
                  </h2>
                </div>

                <button
                    type="button"
                    class="rounded-full bg-warm-100 px-3 py-2 text-sm font-bold text-warm-700 hover:bg-warm-200"
                    @click="closeServiceDetails"
                >
                  ✕
                </button>
              </div>

              <p class="mt-5 text-sm leading-7 text-warm-600 sm:text-base">
                {{ selectedService.displayFullDescription }}
              </p>

              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl bg-warm-50 p-4">
                  <p class="text-sm font-bold text-warm-900">
                    Horaires de consultation
                  </p>

                  <ul class="mt-3 space-y-2 text-sm text-warm-600">
                    <li
                        v-for="item in selectedService.schedule"
                        :key="item"
                        class="flex gap-2"
                    >
                      <i class="fas fa-clock mt-1 text-xs text-primary-600"></i>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <div class="rounded-xl bg-warm-50 p-4">
                  <p class="text-sm font-bold text-warm-900">
                    Avantages
                  </p>

                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                        v-for="benefit in selectedService.benefits"
                        :key="benefit"
                        class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
                    >
                      {{ benefit }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    type="button"
                    class="rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700"
                    @click="handleBook"
                >
                  Prendre rendez-vous
                </button>

                <button
                    type="button"
                    class="rounded-lg border border-warm-200 px-5 py-3 text-sm font-semibold text-warm-700 hover:bg-warm-50"
                    @click="closeServiceDetails"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHomeContent } from '../../shared/composables/useHomeContent'
import type { ServiceDisplay } from '@/features/services/homeContentService'

type LocalizedService = ServiceDisplay & {
  displayName: string
  displayDesc: string
  displayFullDescription: string
  hasModalImage: boolean
}

const { locale } = useI18n()
const { content } = useHomeContent()

const selectedService = ref<LocalizedService | null>(null)

const servicesWithoutModalImage = [
  'Gynécologie-Obstétrique',
  'Dermatologie',
  'Ophtalmologie'
]

const localizedServices = computed<LocalizedService[]>(() =>
    (content.value?.services ?? []).map((service) => ({
      ...service,
      displayName: locale.value === 'en' ? service.nameEn || service.name : service.name,
      displayDesc: locale.value === 'en' ? service.descEn || service.desc : service.desc,
      displayFullDescription:
          locale.value === 'en'
              ? service.fullDescriptionEn || service.fullDescription || service.descEn || service.desc
              : service.fullDescription || service.desc,
      schedule: service.schedule || [],
      benefits: service.benefits || [],
      hasModalImage: !servicesWithoutModalImage.includes(service.name)
    }))
)

function openServiceDetails(service: LocalizedService) {
  selectedService.value = service
}

function closeServiceDetails() {
  selectedService.value = null
}

function handleBook() {
  closeServiceDetails()
  window.appModals?.openAppointment?.()
}
</script>