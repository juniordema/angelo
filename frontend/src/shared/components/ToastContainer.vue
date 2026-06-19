<template>
  <div class="fixed bottom-4 right-4 z-50 space-y-2">
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'p-4 rounded-lg shadow-lg text-white animate-slide-in',
          {
            'bg-green-500': toast.type === 'success',
            'bg-red-500': toast.type === 'error',
            'bg-yellow-500': toast.type === 'warning',
            'bg-blue-500': toast.type === 'info'
          }
        ]"
      >
        <div class="flex items-center gap-2">
          <div v-if="toast.type === 'success'" class="text-xl">✓</div>
          <div v-else-if="toast.type === 'error'" class="text-xl">✕</div>
          <div v-else-if="toast.type === 'warning'" class="text-xl">⚠</div>
          <div v-else class="text-xl">ℹ</div>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.3s ease;
}
</style>
