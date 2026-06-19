<template>
  <button
      type="button"
      class="group relative flex min-h-[280px] overflow-hidden rounded-2xl border border-warm-200 bg-warm-900 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[330px]"
      :class="{ 'border-primary-400 ring-2 ring-primary-100': selected }"
      @click="openDetails"
  >
    <img
        v-if="service.image"
        :src="service.image"
        :alt="service.displayImageAlt || service.name"
        class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        @error="imageError = true"
    />

    <div
        v-if="!service.image || imageError"
        class="absolute inset-0 flex items-center justify-center bg-warm-800 text-white"
    >
      <i class="fas fa-image text-4xl opacity-60"></i>
    </div>

    <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>

    <div class="relative z-10 mt-auto flex w-full justify-center p-4 sm:p-5">
      <span class="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-primary-700 shadow backdrop-blur">
        Voir les détails
        <i class="fas fa-arrow-right text-xs transition group-hover:translate-x-1"></i>
      </span>
    </div>
  </button>

  <Teleport to="body">
    <div
        v-if="showDetails"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        @click.self="closeDetails"
    >
      <div class="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <img
            :src="service.image"
            :alt="service.displayImageAlt || service.name"
            class="h-64 w-full object-cover sm:h-96"
        />

        <div class="p-5 sm:p-8">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-primary-700">
                {{ service.displayRoomName }}
              </p>

              <h2 class="mt-2 text-2xl font-bold text-warm-900 sm:text-3xl">
                {{ service.displayName }}
              </h2>
            </div>

            <button
                type="button"
                class="rounded-full bg-warm-100 px-3 py-2 text-sm font-bold text-warm-700 hover:bg-warm-200"
                @click="closeDetails"
            >
              ✕
            </button>
          </div>

          <p class="mt-5 text-sm leading-7 text-warm-600 sm:text-base">
            {{ service.displayRoomDescription }}
          </p>

          <div class="mt-6 rounded-xl bg-warm-50 p-4">
            <p class="text-sm font-bold text-warm-900">Description</p>
            <p class="mt-2 text-sm leading-6 text-warm-600">
              {{ service.displayDescription }}
            </p>
          </div>

          <div class="mt-4 rounded-xl bg-warm-50 p-4">
            <p class="text-sm font-bold text-warm-900">Équipement</p>
            <p class="mt-2 text-sm leading-6 text-warm-600">
              {{ service.displayEquipment }}
            </p>
          </div>

          <div class="mt-4">
            <p class="text-sm font-bold text-warm-900">Avantages</p>

            <div class="mt-3 flex flex-wrap gap-2">
              <span
                  v-for="benefit in service.displayBenefits"
                  :key="benefit"
                  class="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
              >
                {{ benefit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ImageryDisplay } from '@/features/services/homeContentService'

const props = defineProps<{
  service: ImageryDisplay
  selected?: boolean
}>()

const emit = defineEmits<{
  select: [service: ImageryDisplay]
}>()

const imageError = ref(false)
const showDetails = ref(false)

function openDetails() {
  emit('select', props.service)
  showDetails.value = true
}

function closeDetails() {
  showDetails.value = false
}
</script>