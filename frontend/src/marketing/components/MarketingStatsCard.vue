<template>
  <article class="fluid-panel rounded-lg p-5">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-semibold text-warm-500">{{ label }}</p>
        <p class="font-display mt-2 text-3xl font-bold text-warm-900">{{ value }}</p>
      </div>
      <div class="flex h-11 w-11 items-center justify-center rounded-lg" :class="bgClass">
        <i :class="icon" :style="{ color }"></i>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
  icon: string
  color: string
  bgClass: string
}>()
</script>
