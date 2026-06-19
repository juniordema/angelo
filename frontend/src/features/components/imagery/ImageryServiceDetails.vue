<template>
  <article class="fluid-panel overflow-hidden rounded-lg">
    <div class="grid lg:grid-cols-[0.95fr_1.05fr]">
      <img
        :src="service.image"
        :alt="service.displayImageAlt"
        class="h-full min-h-[320px] w-full object-cover"
      />
      <div class="p-6 sm:p-8">
        <span class="text-sm font-semibold uppercase tracking-widest text-primary-500">
          {{ service.displayRoomName }}
        </span>
        <h3 class="font-display mt-3 text-3xl font-bold text-warm-900">{{ service.displayName }}</h3>
        <p class="mt-4 leading-relaxed text-warm-500">{{ service.displayRoomDescription }}</p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div class="rounded-lg bg-warm-50 p-4">
            <h4 class="font-semibold text-warm-900">{{ equipmentLabel }}</h4>
            <p class="mt-2 text-sm leading-relaxed text-warm-500">{{ service.displayEquipment }}</p>
          </div>
          <div class="rounded-lg bg-warm-50 p-4">
            <h4 class="font-semibold text-warm-900">{{ benefitsLabel }}</h4>
            <ul class="mt-2 space-y-2 text-sm text-warm-500">
              <li v-for="benefit in service.displayBenefits" :key="benefit" class="flex items-start gap-2">
                <i class="fas fa-check mt-1 text-xs text-primary-500"></i>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>
        </div>

        <button
          type="button"
          class="btn-primary mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
          @click="$emit('book')"
        >
          {{ requestLabel }}
          <i class="fas fa-calendar-check text-xs"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { ImageryDisplay } from '@/features/services/homeContentService'

defineProps<{
  service: ImageryDisplay
  equipmentLabel: string
  benefitsLabel: string
  requestLabel: string
}>()

defineEmits<{
  book: []
}>()
</script>
