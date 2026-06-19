<template>
  <main class="bg-warm-50">
    <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="text-sm font-semibold text-primary-700">Articles santé</p>

        <h1 class="mt-2 text-3xl font-bold text-warm-900 sm:text-4xl">
          Conseils et actualités de la Clinique Angelo
        </h1>

        <p class="mt-3 text-sm leading-6 text-warm-600 sm:text-base">
          Retrouvez nos conseils médicaux, informations pratiques et contenus de prévention pour mieux prendre soin de votre santé.
        </p>
      </div>

      <p v-if="loading" class="mt-8 text-sm text-warm-500">
        Chargement des articles...
      </p>

      <p v-else-if="errorMessage" class="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        {{ errorMessage }}
      </p>

      <div v-else-if="articles.length === 0" class="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
        <p class="font-semibold text-warm-900">Aucun article disponible</p>
        <p class="mt-1 text-sm text-warm-500">Les articles publiés apparaîtront ici.</p>
      </div>

      <div v-else class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="article in articles"
            :key="article._id"
            class="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <RouterLink :to="`/articles/${article.slug}`">
            <img
                v-if="article.coverImage"
                :src="getImageUrl(article.coverImage)"
                :alt="article.title"
                class="h-48 w-full object-cover"
            />

            <div v-else class="flex h-48 w-full items-center justify-center bg-primary-50 text-primary-700">
              <i class="fas fa-newspaper text-3xl"></i>
            </div>

            <div class="p-5">
              <span class="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-700">
                {{ article.category || 'Conseils santé' }}
              </span>

              <h2 class="mt-3 line-clamp-2 text-lg font-bold text-warm-900">
                {{ article.title }}
              </h2>

              <p v-if="article.excerpt" class="mt-2 line-clamp-3 text-sm leading-6 text-warm-600">
                {{ article.excerpt }}
              </p>

              <div class="mt-4 flex items-center justify-between text-xs text-warm-500">
                <span>{{ formatDate(article.publishedAt || article.createdAt) }}</span>
                <span>{{ article.views || 0 }} vues</span>
              </div>
            </div>
          </RouterLink>

          <div class="border-t border-warm-100 px-5 py-4">
            <button
                type="button"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-50 px-4 py-2 text-sm font-bold text-primary-700 transition hover:bg-primary-100"
                @click="shareOnFacebook(article)"
            >
              <i class="fab fa-facebook-f"></i>
              Partager sur Facebook
            </button>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getApiErrorMessage } from '@/shared/api/client'
import {
  fetchPublishedArticles,
  trackArticleShare,
  type Article
} from '@/features/content/services/contentService'

const articles = ref<Article[]>([])
const loading = ref(false)
const errorMessage = ref('')

function debugPage(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[PublicArticlesPage] ${message}`, payload ?? '')
  }
}

onMounted(() => {
  debugPage('mounted')
  loadArticles()
})

async function loadArticles() {
  try {
    loading.value = true
    errorMessage.value = ''
    debugPage('loading public articles')

    articles.value = (await fetchPublishedArticles()).filter((article) => article.status === 'published')
    debugPage('public articles loaded', { count: articles.value.length })
  } catch (error) {
    console.error('[PublicArticlesPage] loadArticles failed', error)
    errorMessage.value = getApiErrorMessage(error, 'Impossible de charger les articles.')
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

function getArticleUrl(article: Article) {
  return `${getPublicSiteUrl()}/articles/${article.slug}`
}

function getImageUrl(path: string) {
  if (!path) return ''

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  return `${getApiBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`
}

async function shareOnFacebook(article: Article) {
  const articleUrl = getArticleUrl(article)
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`

  window.open(
      shareUrl,
      '_blank',
      'width=700,height=600,noopener,noreferrer'
  )

  try {
    await trackArticleShare(article._id, 'facebook')
  } catch (error) {
    console.error('[PublicArticlesPage] Facebook share tracking failed', error)
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
</script>