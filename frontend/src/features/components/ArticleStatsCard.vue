<template>
  <article class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm sm:p-5">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <p class="text-sm font-semibold text-warm-500">
          {{ title }}
        </p>

        <p class="mt-2 text-2xl font-bold text-warm-900 sm:text-3xl">
          {{ value }}
        </p>

        <p v-if="description" class="mt-1 text-xs text-warm-500 sm:text-sm">
          {{ description }}
        </p>
      </div>

      <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          :class="iconBgClass"
      >
        <i :class="[icon, iconTextClass]" class="text-base"></i>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  description?: string
  icon: string
  iconBgClass?: string
  iconTextClass?: string
}>()
</script>