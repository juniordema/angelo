import { computed, onMounted, ref } from 'vue'

import { fetchHomeContent, type HomeContentDisplay } from '../../features/services/homeContentService'

let cachedContent: HomeContentDisplay | null = null
let cachedPromise: Promise<HomeContentDisplay> | null = null

export function useHomeContent() {
  const content = ref<HomeContentDisplay | null>(cachedContent)
  const loading = ref(!cachedContent)
  const error = ref<string | null>(null)

  async function load() {
    loading.value = true
    error.value = null

    try {
      if (!cachedPromise) {
        cachedPromise = fetchHomeContent()
      }

      const nextContent = await cachedPromise
      cachedContent = nextContent
      content.value = nextContent
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur de chargement'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (!cachedContent) {
      void load()
    }
  })

  return {
    content,
    loading: computed(() => loading.value),
    error,
    refresh: load
  }
}
