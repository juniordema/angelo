<template>
  <nav class="sticky top-0 z-50 border-b border-warm-200/70 bg-white/95 shadow-[0_1px_20px_rgba(28,27,24,0.06)] backdrop-blur-xl">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <router-link to="/" class="flex items-center gap-3" @click="closeMobileMenu(); activateNav('home')">
          <img :src="logo" alt="Angelo Clinic logo" class="h-10 w-10 rounded-lg object-contain ring-1 ring-warm-200" />
          <span class="hidden font-bold text-warm-900 sm:inline">Clinique Angelo</span>
        </router-link>

        <div class="hidden items-center gap-1 lg:flex">
          <router-link
              v-for="item in navItems"
              :key="item.id"
              :to="item.to"
              class="nav-link"
              :class="{ 'nav-link-active': isActiveNav(item.id) }"
              @click="activateNav(item.id)"
          >
            {{ $t(item.labelKey) }}
          </router-link>
        </div>

        <div class="hidden items-center gap-2 lg:flex">
          <div class="relative">
            <button type="button" class="nav-action border border-warm-200 bg-white text-warm-700 hover:bg-warm-50" @click="languageMenuOpen = !languageMenuOpen">
              <i class="fas fa-globe text-xs"></i>
              {{ languageStore.currentLanguage.toUpperCase() }}
            </button>

            <div v-if="languageMenuOpen" class="absolute right-0 top-full mt-2 w-28 rounded-xl border border-warm-200 bg-white p-2 shadow-xl">
              <button class="language-option" :class="{ 'language-option-active': languageStore.isFrench }" @click="changeLanguage('fr')">FR</button>
              <button class="language-option" :class="{ 'language-option-active': languageStore.isEnglish }" @click="changeLanguage('en')">EN</button>
            </div>
          </div>

          <button @click="openLoginModal" class="nav-action bg-primary-50 text-primary-700 hover:bg-primary-100">
            {{ $t('nav.login') }}
          </button>

          <button @click="openAppointmentModal" class="btn-primary rounded-lg px-4 py-2 text-sm font-semibold">
            {{ $t('nav.appointment') }}
          </button>
        </div>

        <div class="flex items-center gap-2 lg:hidden">
          <div class="inline-flex items-center rounded-full border border-warm-200 bg-white p-1 shadow-sm">
            <button
                type="button"
                @click="changeLanguage('fr')"
                class="min-w-10 rounded-full px-2.5 py-1.5 text-xs font-bold transition"
                :class="languageStore.isFrench ? 'bg-primary-600 text-white' : 'text-warm-600'"
            >
              FR
            </button>

            <button
                type="button"
                @click="changeLanguage('en')"
                class="min-w-10 rounded-full px-2.5 py-1.5 text-xs font-bold transition"
                :class="languageStore.isEnglish ? 'bg-primary-600 text-white' : 'text-warm-600'"
            >
              EN
            </button>
          </div>

          <button class="flex h-10 w-10 items-center justify-center rounded-lg text-warm-700 hover:bg-warm-100" @click="mobileMenuOpen = !mobileMenuOpen">
            <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
      </div>

      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="border-t border-warm-200/80 py-4 lg:hidden">
          <div class="grid gap-1">
            <router-link
                v-for="item in navItems"
                :key="item.id"
                :to="item.to"
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link-active': isActiveNav(item.id) }"
                @click="closeMobileMenu(); activateNav(item.id)"
            >
              {{ $t(item.labelKey) }}
            </router-link>
          </div>

          <div class="mt-4 grid gap-2">
            <button @click="openLoginModal" class="mobile-action">
              {{ $t('nav.login') }}
            </button>

            <button @click="openAppointmentModal" class="btn-primary w-full rounded-lg px-4 py-3 text-sm font-semibold">
              {{ $t('nav.appointment') }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </nav>

  <Teleport to="body">
    <div v-if="showLoginModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" @click.self="closeLoginModal">
      <form class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" @submit.prevent="handleLogin">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold text-primary-700">{{ $t('nav.login') }}</p>
            <h2 class="mt-1 text-2xl font-bold text-warm-900">Espace administrateur</h2>
          </div>

          <button type="button" class="rounded-full bg-warm-100 px-3 py-2 text-sm font-bold" @click="closeLoginModal">
            ✕
          </button>
        </div>

        <p v-if="loginError" class="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {{ loginError }}
        </p>

        <div class="mt-6 space-y-4">
          <input
              v-model="loginForm.email"
              type="email"
              placeholder="Email"
              class="w-full rounded-lg border border-warm-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none"
              required
          />

          <div class="relative">
            <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Mot de passe"
                class="w-full rounded-lg border border-warm-200 px-4 py-3 pr-12 text-sm focus:border-primary-500 focus:outline-none"
                required
            />

            <button
                type="button"
                class="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-warm-400 hover:text-primary-700"
                @click="showPassword = !showPassword"
            >
              <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </button>
          </div>

          <button
              type="submit"
              class="w-full rounded-lg bg-primary-600 px-4 py-3 text-sm font-bold text-white hover:bg-primary-700 disabled:opacity-60"
              :disabled="loginLoading"
          >
            {{ loginLoading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </div>
      </form>
    </div>
  </Teleport>

  <Teleport to="body">
    <div v-if="showAppointmentModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" @click.self="closeAppointmentModal">
      <div class="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
          <i class="fas fa-calendar-check text-2xl text-primary-700"></i>
        </div>

        <h2 class="mt-5 text-2xl font-bold text-warm-900">{{ $t('nav.appointment') }}</h2>

        <p class="mt-3 text-sm leading-7 text-warm-500">
          Cette fonctionnalité est en cours de développement.
        </p>

        <button class="mt-6 rounded-lg bg-primary-600 px-5 py-3 text-sm font-bold text-white" @click="closeAppointmentModal">
          Compris
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '../../auth/stores/authStore'
import { useLanguageStore } from '../../stores/languageStore'
import { useActiveSection } from '../../shared/composables/useActiveSection'

import logo from '../../assets/images/clinic/logo.png'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { activeSection } = useActiveSection()

const mobileMenuOpen = ref(false)
const languageMenuOpen = ref(false)
const showLoginModal = ref(false)
const showAppointmentModal = ref(false)
const showPassword = ref(false)
const selectedNav = ref('home')
const loginLoading = ref(false)
const loginError = ref('')

const loginForm = ref({
  email: '',
  password: ''
})

const navItems = [
  { id: 'home', labelKey: 'nav.home', to: '/' },
  { id: 'services', labelKey: 'nav.services', to: { path: '/', hash: '#services' } },
  { id: 'imagerie', labelKey: 'nav.imaging', to: { path: '/', hash: '#imagerie' } },
  { id: 'doctors', labelKey: 'nav.doctors', to: { path: '/', hash: '#doctors' } },
  { id: 'contact', labelKey: 'nav.contact', to: { path: '/', hash: '#contact' } }
]

onMounted(() => {
  syncNavFromRoute()
})

watch(activeSection, (sectionId) => {
  if (sectionId) selectedNav.value = sectionId
})

watch(
    () => route.hash,
    () => {
      syncNavFromRoute()
    }
)

function changeLanguage(lang: 'fr' | 'en') {
  languageStore.setLanguage(lang)
  languageMenuOpen.value = false
  mobileMenuOpen.value = false
}

function openLoginModal() {
  closeMobileMenu()
  loginError.value = ''
  showLoginModal.value = true
}

function closeLoginModal() {
  showLoginModal.value = false
  showPassword.value = false
  loginError.value = ''
}

async function handleLogin() {
  try {
    loginLoading.value = true
    loginError.value = ''

    await authStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    closeLoginModal()
    loginForm.value.email = ''
    loginForm.value.password = ''

    router.push('/admin')
  } catch (error) {
    console.error('[Navbar] login failed', error)
    loginError.value = 'Email ou mot de passe incorrect.'
  } finally {
    loginLoading.value = false
  }
}

function openAppointmentModal() {
  closeMobileMenu()
  showAppointmentModal.value = true
}

function closeAppointmentModal() {
  showAppointmentModal.value = false
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function activateNav(sectionId: string) {
  selectedNav.value = sectionId
}

function isActiveNav(sectionId: string) {
  return selectedNav.value === sectionId
}

function syncNavFromRoute() {
  const hash = route.hash.replace('#', '')

  if (hash) {
    const match = navItems.find((item) => item.id === hash)

    if (match) {
      selectedNav.value = match.id
      return
    }
  }

  if (route.path === '/') {
    selectedNav.value = activeSection.value || 'home'
  }
}
</script>

<style scoped>
.nav-link {
  @apply rounded-lg px-3 py-2 text-sm font-semibold text-warm-700 transition hover:bg-warm-100 hover:text-primary-700;
}

.nav-link-active {
  @apply bg-primary-50 text-primary-700 ring-1 ring-primary-100;
}

.nav-action {
  @apply inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition;
}

.language-option {
  @apply w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-warm-600 transition hover:bg-warm-50;
}

.language-option-active {
  @apply bg-primary-50 text-primary-700;
}

.mobile-nav-link {
  @apply rounded-lg px-4 py-3 text-sm font-semibold text-warm-700 transition hover:bg-warm-100 hover:text-primary-700;
}

.mobile-nav-link-active {
  @apply bg-primary-50 text-primary-700 ring-1 ring-primary-100;
}

.mobile-action {
  @apply rounded-lg border border-warm-200 bg-white px-4 py-3 text-left text-sm font-bold text-warm-700;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>