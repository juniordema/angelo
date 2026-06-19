<template>
  <main class="bg-warm-50">
    <section class="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <RouterLink
          to="/articles"
          class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700"
      >
        <i class="fas fa-arrow-left text-xs"></i>
        Retour aux articles
      </RouterLink>

      <p v-if="loading" class="mt-8 text-sm text-warm-500">
        Chargement de l’article...
      </p>

      <p v-else-if="errorMessage" class="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <article v-else-if="article" class="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <div v-if="article.coverImage" class="mb-6 overflow-hidden rounded-2xl bg-warm-50">
          <img
              :src="getImageUrl(article.coverImage)"
              :alt="article.title"
              class="max-h-[420px] w-full object-contain"
          />
        </div>

        <div class="space-y-4">
          <span class="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
            {{ article.category || 'Conseils santé' }}
          </span>

          <h1 class="text-3xl font-bold text-warm-900 sm:text-4xl">
            {{ article.title }}
          </h1>

          <p v-if="article.excerpt" class="text-base leading-7 text-warm-600">
            {{ article.excerpt }}
          </p>

          <div class="flex flex-wrap gap-2 text-xs text-warm-500">
            <span>Par {{ article.author || 'Clinique Angelo' }}</span>
            <span>•</span>
            <span>{{ formattedDate }}</span>
          </div>
        </div>

        <div class="prose prose-warm mt-8 max-w-none whitespace-pre-line text-warm-700">
          {{ article.content }}
        </div>

        <div class="mt-8 border-t border-warm-200 pt-6">
          <p class="mb-3 text-sm font-bold text-warm-900">
            Partager cet article
          </p>

          <div class="flex flex-wrap gap-2">
            <button class="share-btn" @click="shareArticle('whatsapp')">
              WhatsApp
            </button>

            <button class="share-btn" @click="shareArticle('facebook')">
              Facebook
            </button>

            <button class="share-btn" @click="shareArticle('linkedin')">
              LinkedIn
            </button>

            <button class="share-btn" @click="shareArticle('twitter')">
              X / Twitter
            </button>

            <button class="share-btn" @click="copyLink">
              Copier le lien
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getApiErrorMessage } from '@/shared/api/client'
import {
  fetchPublishedArticleBySlug,
  incrementArticleView,
  trackArticleShare,
  type Article
} from '@/features/content/services/contentService'

const route = useRoute()

const article = ref<Article | null>(null)
const loading = ref(false)
const errorMessage = ref('')

const formattedDate = computed(() => {
  if (!article.value) return ''

  const date = article.value.publishedAt || article.value.createdAt

  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

function debugPage(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[PublicArticleDetailPage] ${message}`, payload ?? '')
  }
}

onMounted(() => {
  debugPage('mounted', route.params)
  loadArticle()
})

async function loadArticle() {
  try {
    loading.value = true
    errorMessage.value = ''

    const slug = String(route.params.slug || '')
    debugPage('loading article', slug)

    article.value = await fetchPublishedArticleBySlug(slug)
    debugPage('article loaded', article.value)

    if (article.value?._id) {
      await incrementArticleView(article.value._id)
    }
  } catch (error) {
    console.error('[PublicArticleDetailPage] loadArticle failed', error)
    errorMessage.value = getApiErrorMessage(error, 'Impossible de charger cet article.')
  } finally {
    loading.value = false
  }
}

function getPublicSiteUrl() {
  return (import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, '')
}

function getApiBaseUrl() {
  return (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '').replace(/\/$/, '')
}

function getCurrentArticleUrl() {
  if (!article.value?.slug) {
    return window.location.href
  }

  return `${getPublicSiteUrl()}/articles/${article.value.slug}`
}

function getImageUrl(path: string) {
  if (!path) return ''

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

async function shareArticle(platform: 'whatsapp' | 'facebook' | 'linkedin' | 'twitter') {
  if (!article.value) return

  const articleUrl = getCurrentArticleUrl()
  const title = encodeURIComponent(article.value.title)
  const encodedUrl = encodeURIComponent(articleUrl)

  try {
    debugPage('share article', platform)
    await trackArticleShare(article.value._id, platform)
  } catch (error) {
    console.error('[PublicArticleDetailPage] share tracking failed', error)
  }

  const links: Record<string, string> = {
    whatsapp: `https://wa.me/?text=${title}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${title}&url=${encodedUrl}`
  }

  window.open(
      links[platform],
      '_blank',
      'width=700,height=600,noopener,noreferrer'
  )
}

async function copyLink() {
  if (!article.value) return

  const articleUrl = getCurrentArticleUrl()

  await navigator.clipboard.writeText(articleUrl)

  try {
    debugPage('copy article link')
    await trackArticleShare(article.value._id, 'copyLink')
  } catch (error) {
    console.error('[PublicArticleDetailPage] copy tracking failed', error)
  }

  alert('Lien copié.')
}
</script>

<style scoped>
.share-btn {
  @apply rounded-lg border border-warm-200 px-4 py-2 text-sm font-semibold text-warm-700 hover:bg-warm-50;
}
</style>