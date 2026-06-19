<template>
  <header
      class="sticky top-0 z-40 overflow-visible border-b border-warm-200/70 bg-white/95 px-4 py-5 shadow-[0_1px_20px_rgba(28,27,24,0.06)] backdrop-blur-xl sm:px-6"
  >
    <div class="absolute inset-0 bg-gradient-to-r from-primary-50 via-white to-warm-50"></div>

    <div class="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div class="min-w-0">
        <div class="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1">
          <span class="h-2 w-2 rounded-full bg-primary-600"></span>

          <p class="text-xs font-bold uppercase tracking-widest text-primary-700">
            {{ $t('admin.title') }}
          </p>
        </div>

        <h1 class="mt-3 font-display text-2xl font-extrabold tracking-tight text-warm-950 sm:text-3xl">
          {{ title }}
        </h1>

        <p class="mt-1 text-sm text-warm-500">
          {{ subtitle }}
        </p>
      </div>

      <div class="relative self-start lg:self-auto">
        <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-warm-200 bg-white px-4 py-2 text-sm font-bold text-warm-700 shadow-sm transition hover:bg-warm-50"
            @click="languageMenuOpen = !languageMenuOpen"
        >
          <i class="fas fa-globe text-xs"></i>
          {{ languageStore.currentLanguage.toUpperCase() }}
          <i
              class="fas fa-chevron-down text-[10px] text-warm-400 transition"
              :class="{ 'rotate-180': languageMenuOpen }"
          ></i>
        </button>

        <div
            v-if="languageMenuOpen"
            class="absolute right-0 top-full z-50 mt-2 w-32 rounded-xl border border-warm-200 bg-white p-2 shadow-xl"
        >
          <button
              type="button"
              class="language-option"
              :class="{ 'language-option-active': languageStore.isFrench }"
              @click="changeLanguage('fr')"
          >
            FR
          </button>

          <button
              type="button"
              class="language-option"
              :class="{ 'language-option-active': languageStore.isEnglish }"
              @click="changeLanguage('en')"
          >
            EN
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '../../stores/languageStore'

const route = useRoute()
const languageStore = useLanguageStore()
const { t } = useI18n()

const languageMenuOpen = ref(false)

const title = computed(() => {
  if (route.path.startsWith('/admin/content/articles')) return t('admin.articles')
  if (route.path.startsWith('/admin/content')) return t('admin.contentHub')
  if (route.path.startsWith('/admin/campaigns')) return t('admin.campaigns')
  if (route.path.startsWith('/admin/leads')) return t('admin.leads')

  return t('admin.dashboard')
})

const subtitle = computed(() => {
  if (route.path.startsWith('/admin/content/articles')) return t('admin.articlesSubtitle')
  if (route.path.startsWith('/admin/content')) return t('admin.contentHubSubtitle')
  if (route.path.startsWith('/admin/campaigns')) return t('admin.campaignsSubtitle')
  if (route.path.startsWith('/admin/leads')) return t('admin.leadsSubtitle')

  return t('admin.dashboardSubtitle')
})

function changeLanguage(lang: 'fr' | 'en') {
  languageStore.setLanguage(lang)
  languageMenuOpen.value = false
}
</script>

<style scoped>
.language-option {
  @apply w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-warm-600 transition hover:bg-warm-50;
}

.language-option-active {
  @apply bg-primary-50 text-primary-700;
}
</style>