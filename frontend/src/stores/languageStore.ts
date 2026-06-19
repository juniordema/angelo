

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '../i18n'

type Locale = 'fr' | 'en'

export const useLanguageStore = defineStore('language', () => {
  const storedLanguage = localStorage.getItem('language')
  const currentLanguage = ref<Locale>(storedLanguage === 'en' ? 'en' : 'fr')
  
  i18n.global.locale.value = currentLanguage.value

  function setLanguage(lang: Locale) {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    i18n.global.locale.value = lang
  }

  function toggleLanguage() {
    const newLang = currentLanguage.value === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
  }

  const isEnglish = computed(() => currentLanguage.value === 'en')
  const isFrench = computed(() => currentLanguage.value === 'fr')

  return {
    currentLanguage,
    setLanguage,
    toggleLanguage,
    isEnglish,
    isFrench
  }
})
