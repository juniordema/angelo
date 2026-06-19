<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="fluid-panel rounded-lg p-5 text-center"
    >
      <div class="font-display text-3xl font-bold text-primary-700">{{ stat.value }}</div>
      <div class="mt-1 text-sm font-semibold text-warm-500">{{ stat.label }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: Array<{
    value: string
    label: string
  }>
}>()
</script>
