<template>
  <section id="imagerie" class="section-y bg-gradient-to-b from-white to-warm-50 border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10 sm:mb-16 max-w-3xl mx-auto">
        <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">
          {{ $t('nav.imaging') }}
        </span>

        <h2 class="section-title font-display font-bold text-warm-900 mt-3 mb-4">
          {{ $t('imaging.title') }}
        </h2>

        <p class="text-base text-warm-600 max-w-3xl mx-auto sm:text-lg">
          {{ $t('imaging.description') }}
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <ImageryServiceCard
            v-for="service in localizedImageryServices"
            :key="service.id"
            :service="service"
            :selected="selectedService?.id === service.id"
            @select="selectService"
        />
      </div>

      <ImageryStatsGrid class="mt-12 sm:mt-16" :stats="imageryStats" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import ImageryServiceCard from '@/features/components/imagery/ImageryServiceCard.vue'
import ImageryStatsGrid from '@/features/components/imagery/ImageryStatsGrid.vue'
import type { ContentLocale, ImageryDisplay } from '@/features/services/homeContentService'
import { useHomeContent } from '@/shared/composables/useHomeContent'

const { locale, t } = useI18n()
const { content } = useHomeContent()

const currentLocale = computed(() => locale.value as ContentLocale)

const localizedImageryServices = computed<ImageryDisplay[]>(() =>
    (content.value?.imageryServices ?? []).map((service) => ({
      ...service,
      image: service.image || '',
      displayName: currentLocale.value === 'en' ? service.nameEn || service.name : service.name,
      displayDescription: currentLocale.value === 'en' ? service.descriptionEn || service.description : service.description,
      displayEquipment: currentLocale.value === 'en' ? service.equipmentEn || service.equipment : service.equipment,
      displayBenefits: currentLocale.value === 'en' ? service.benefitsEn || service.benefits : service.benefits,
      displayRoomName: currentLocale.value === 'en' ? service.roomNameEn || service.roomName : service.roomName,
      displayRoomDescription: currentLocale.value === 'en' ? service.roomDescriptionEn || service.roomDescription : service.roomDescription,
      displayImageAlt: currentLocale.value === 'en' ? service.imageAltEn || service.imageAlt : service.imageAlt
    }))
)

const selectedService = ref<ImageryDisplay | undefined>()

const imageryStats = computed(() => [
  { value: `${localizedImageryServices.value.length}+`, label: t('imaging.stats.services') },
  { value: '50+', label: t('imaging.stats.exams') },
  { value: locale.value === 'en' ? '15 years' : '15 ans', label: t('imaging.stats.experience') },
  { value: '100%', label: t('imaging.stats.digital') }
])

watch(
    localizedImageryServices,
    (services) => {
      if (!selectedService.value && services.length > 0) {
        selectedService.value = services[0]
      }
    },
    { immediate: true }
)

function selectService(service: ImageryDisplay) {
  selectedService.value = service
}
</script>

<style scoped>
section {
  scroll-behavior: smooth;
}
</style>