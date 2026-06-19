<template>
  <button
    type="button"
    class="relative flex h-10 w-10 items-center justify-center rounded-lg bg-warm-100 text-warm-700 transition hover:bg-primary-50 hover:text-primary-700"
    aria-label="Notifications"
  >
    <i class="fas fa-bell text-sm"></i>
    <span
      v-if="notificationCount > 0"
      class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white"
    >
      {{ notificationCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  count?: number
}>()

const notificationCount = computed(() => props.count ?? 0)
</script>
