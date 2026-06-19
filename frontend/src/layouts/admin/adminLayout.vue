<template>
  <div class="min-h-screen bg-warm-50 lg:grid lg:grid-cols-[280px_1fr] lg:grid-rows-[auto_1fr]">
    <AdminHeader class="order-1 lg:col-start-2 lg:row-start-1" />
    <AdminSidebar class="order-2 lg:col-start-1 lg:row-span-2" @logout="logout" />
    <main class="order-3 p-4 sm:p-6 lg:col-start-2 lg:row-start-2">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../../auth/stores/authStore'
import AdminHeader from './adminHeader.vue'
import AdminSidebar from './adminsidebar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

function debugLayout(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[AdminLayout] ${message}`, payload ?? "")
  }
}

onMounted(() => {
  debugLayout("mounted", {
    path: route.fullPath,
    matched: route.matched.map((record) => record.path)
  })
})

watch(
  () => route.fullPath,
  (path) => {
    debugLayout("route changed", path)
  }
)

function logout() {
  debugLayout("logout")
  authStore.logout()
  router.push('/')
}
</script>
