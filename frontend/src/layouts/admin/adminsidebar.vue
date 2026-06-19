<template>
  <aside
      class="relative z-40 flex shrink-0 flex-col border-r border-warm-200/70 bg-white/95 shadow-[0_1px_20px_rgba(28,27,24,0.04)] backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-72"
  >
    <div class="relative flex h-full min-h-0 flex-col p-4">
      <div
          class="flex shrink-0 items-center gap-3 rounded-2xl border border-warm-200 bg-white px-3 py-3 shadow-sm"
      >
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 ring-1 ring-primary-100">
          <img
              src="../../assets/images/clinic/logo.png"
              alt="Clinique Angelo"
              class="h-8 w-8 rounded-lg object-contain"
          />
        </div>

        <div class="min-w-0">
          <p class="text-[11px] font-bold uppercase tracking-widest text-primary-600">
            {{ t('admin.title') }}
          </p>

          <p class="truncate font-display text-lg font-bold text-warm-900">
            Angelo
          </p>
        </div>
      </div>

      <div class="mt-4 shrink-0 lg:hidden">
        <button
            type="button"
            class="flex w-full items-center justify-between rounded-2xl border border-warm-200 bg-warm-50 px-4 py-3 text-sm font-bold text-warm-800"
            @click="mobileOpen = !mobileOpen"
        >
          <span>{{ t('admin.menu') }}</span>
          <i class="fas" :class="mobileOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
      </div>

      <Transition name="sidebar-mobile">
        <div
            v-if="mobileOpen || isDesktop"
            class="mt-4 min-h-0 flex-1 rounded-2xl border border-warm-200 bg-white p-2 shadow-sm lg:overflow-y-auto"
        >
          <nav class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <router-link
                v-for="item in items"
                :key="item.to"
                :to="item.to"
                class="admin-link group"
                active-class="admin-link-active"
                exact-active-class="admin-link-active"
                @click="mobileOpen = false"
            >
              <span class="admin-link-icon">
                <i :class="item.icon" class="w-4 text-center"></i>
              </span>

              <span class="min-w-0 flex-1 truncate">
                {{ item.label }}
              </span>

              <i class="fas fa-angle-right hidden text-[10px] text-warm-300 transition group-hover:text-primary-500 lg:block"></i>
            </router-link>
          </nav>
        </div>
      </Transition>

      <div class="mt-4 shrink-0 space-y-4">
        <div class="hidden rounded-2xl border border-primary-100 bg-primary-50 p-4 lg:block">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-700">
              <i class="fas fa-shield-alt"></i>
            </div>

            <div class="min-w-0">
              <p class="text-sm font-bold text-warm-900">
                {{ t('admin.secureArea') }}
              </p>

              <p class="text-xs text-warm-500">
                {{ t('admin.clinicAdministration') }}
              </p>
            </div>
          </div>
        </div>

        <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-100"
            @click="handleLogout"
        >
          <i class="fas fa-sign-out-alt"></i>
          {{ t('admin.logout') }}
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const emit = defineEmits<{
  logout: []
}>()

const { t } = useI18n()

const mobileOpen = ref(false)
const windowWidth = ref(window.innerWidth)

const isDesktop = computed(() => windowWidth.value >= 1024)

const items = computed(() => [
  { to: '/admin', label: t('admin.dashboard'), icon: 'fas fa-chart-line' },
  { to: '/admin/campaigns', label: t('admin.campaigns'), icon: 'fas fa-bullhorn' },
  { to: '/admin/leads', label: t('admin.leads'), icon: 'fas fa-user-plus' },
  { to: '/admin/content', label: t('admin.contentHub'), icon: 'fas fa-newspaper' },
  { to: '/admin/content/articles', label: t('admin.articles'), icon: 'fas fa-file-lines' }
])

function handleResize() {
  windowWidth.value = window.innerWidth
}

function handleLogout() {
  emit('logout')
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.admin-link {
  @apply flex min-h-12 items-center gap-2.5 rounded-xl border border-transparent bg-warm-50 px-3 py-3 text-sm font-semibold text-warm-600 transition hover:-translate-y-[1px] hover:border-primary-100 hover:bg-primary-50 hover:text-primary-700 lg:min-h-0 lg:px-3 lg:py-2.5;
}

.admin-link-active {
  @apply border-primary-100 bg-primary-50 text-primary-700 shadow-sm;
}

.admin-link-icon {
  @apply flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-warm-500 transition;
}

.admin-link:hover .admin-link-icon,
.admin-link-active .admin-link-icon {
  @apply bg-primary-100 text-primary-700;
}

.sidebar-mobile-enter-active,
.sidebar-mobile-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.sidebar-mobile-enter-from,
.sidebar-mobile-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>