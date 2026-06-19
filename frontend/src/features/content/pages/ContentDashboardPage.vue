<template>
  <main class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-semibold text-primary-700">{{ t('admin.contentHub') }}</p>
        <h1 class="text-2xl font-bold text-warm-900 sm:text-3xl">
          {{ t('adminPages.contentDashboard.title') }}
        </h1>
        <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.contentDashboard.subtitle') }}</p>
      </div>

      <RouterLink
        to="/admin/content/articles/new"
        class="rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary-700"
      >
        {{ t('adminPages.contentDashboard.create') }}
      </RouterLink>
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-warm-500 shadow-sm">
      {{ t('adminPages.contentDashboard.loading') }}
    </p>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ArticleStatsCard :title="t('adminPages.contentDashboard.stats.articles')" :value="stats.totalArticles" icon="fas fa-newspaper" icon-bg-class="bg-primary-50" icon-text-class="text-primary-700" />
      <ArticleStatsCard :title="t('adminPages.contentDashboard.stats.published')" :value="stats.publishedArticles" icon="fas fa-check" icon-bg-class="bg-green-50" icon-text-class="text-green-700" />
      <ArticleStatsCard :title="t('adminPages.contentDashboard.stats.drafts')" :value="stats.draftArticles" icon="fas fa-pen" icon-bg-class="bg-warm-100" icon-text-class="text-warm-700" />
      <ArticleStatsCard :title="t('adminPages.contentDashboard.stats.views')" :value="stats.totalViews" icon="fas fa-eye" icon-bg-class="bg-blue-50" icon-text-class="text-blue-700" />
    </div>

    <section class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <article class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 class="text-lg font-bold text-warm-900">
          {{ t('adminPages.contentDashboard.performance') }}
        </h2>

        <div class="mt-4 space-y-4">
          <div class="flex items-center justify-between rounded-xl bg-warm-50 p-4">
            <span class="text-sm font-semibold text-warm-600">{{ t('adminPages.contentDashboard.scheduled') }}</span>
            <span class="text-lg font-bold text-warm-900">{{ stats.scheduledArticles }}</span>
          </div>

          <div class="flex items-center justify-between rounded-xl bg-warm-50 p-4">
            <span class="text-sm font-semibold text-warm-600">{{ t('adminPages.contentDashboard.shares') }}</span>
            <span class="text-lg font-bold text-warm-900">{{ stats.totalShares }}</span>
          </div>
        </div>
      </article>

      <article class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 class="text-lg font-bold text-warm-900">
          {{ t('adminPages.contentDashboard.quickAccess') }}
        </h2>

        <div class="mt-4 grid gap-3">
          <RouterLink
            to="/admin/content/articles"
            class="rounded-xl border border-warm-200 p-4 text-sm font-semibold text-warm-700 hover:bg-warm-50"
          >
            {{ t('adminPages.contentDashboard.viewAll') }}
          </RouterLink>

          <RouterLink
            to="/admin/content/articles/new"
            class="rounded-xl border border-warm-200 p-4 text-sm font-semibold text-warm-700 hover:bg-warm-50"
          >
            {{ t('adminPages.contentDashboard.create') }}
          </RouterLink>
        </div>
      </article>
    </section>

    <section class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm sm:p-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 class="text-lg font-bold text-warm-900">
            {{ t('adminPages.contentDashboard.recent') }}
          </h2>
          <p class="text-sm text-warm-500">{{ t('adminPages.contentDashboard.recentDescription') }}</p>
        </div>

        <RouterLink
          to="/admin/content/articles"
          class="text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          {{ t('adminPages.contentDashboard.viewAllLink') }}
        </RouterLink>
      </div>

      <div class="mt-4">
        <ArticleTable
          :articles="recentArticles"
          @edit="editArticle"
          @publish="handlePublish"
          @unpublish="handleUnpublish"
          @delete="handleDelete"
        />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getApiErrorMessage } from '../../../shared/api/client'
import ArticleStatsCard from '../../components/ArticleStatsCard.vue'
import ArticleTable from '../../components/ArticleTable.vue'
import {
  deleteArticle,
  fetchArticles,
  fetchContentStats,
  publishArticle,
  translateArticle,
  unpublishArticle,
  type Article,
  type ContentStats
} from '../services/contentService'
import { getLocalizedArticle } from '../utils/articleLocalization'

const router = useRouter()
const { t, locale } = useI18n()

const articles = ref<Article[]>([])
const loading = ref(false)
const errorMessage = ref('')
const translatedArticleIds = new Set<string>()

const stats = ref<ContentStats>({
  totalArticles: 0,
  publishedArticles: 0,
  draftArticles: 0,
  scheduledArticles: 0,
  totalViews: 0,
  totalShares: 0
})

const recentArticles = computed(() => articles.value.slice(0, 5))

function debugPage(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[ContentDashboardPage] ${message}`, payload ?? "")
  }
}

onMounted(() => {
  debugPage("mounted")
  loadDashboard()
})

watch(
  () => locale.value,
  () => {
    void hydrateEnglishTranslations()
  }
)

async function loadDashboard() {
  try {
    loading.value = true
    errorMessage.value = ''
    debugPage("loading dashboard data")

    const [statsData, articlesData] = await Promise.all([
      fetchContentStats(),
      fetchArticles()
    ])

    stats.value = statsData
    articles.value = articlesData
    await hydrateEnglishTranslations()

    debugPage("dashboard data loaded", {
      stats: stats.value,
      articles: articles.value.length
    })
  } catch (error) {
    console.error("[ContentDashboardPage] loadDashboard failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentDashboard.error'))
  } finally {
    loading.value = false
  }
}

function needsEnglishTranslation(article: Article) {
  return locale.value === 'en' && (!article.titleEn || !article.contentEn)
}

async function hydrateEnglishTranslations() {
  if (locale.value !== 'en') return

  const pendingArticles = articles.value.filter(
    (article) => needsEnglishTranslation(article) && !translatedArticleIds.has(article._id)
  )

  if (pendingArticles.length === 0) return

  const translatedArticles = await Promise.allSettled(
    pendingArticles.map(async (article) => {
      const translated = await translateArticle({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        tags: article.tags
      })

      return {
        articleId: article._id,
        translated
      }
    })
  )

  const translationsById = new Map<string, Partial<Article>>()

  translatedArticles.forEach((result) => {
    if (result.status === 'fulfilled') {
      translatedArticleIds.add(result.value.articleId)
      translationsById.set(result.value.articleId, result.value.translated)
    }
  })

  if (translationsById.size === 0) return

  articles.value = articles.value.map((article) => ({
    ...article,
    ...translationsById.get(article._id)
  }))
}

function editArticle(article: Article) {
  debugPage("edit article", article._id)
  router.push(`/admin/content/articles/${article._id}/edit`)
}

async function handlePublish(article: Article) {
  try {
    debugPage("publish article", article._id)
    await publishArticle(article._id)
    await loadDashboard()
  } catch (error) {
    console.error("[ContentDashboardPage] publish failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.publishError'))
  }
}

async function handleUnpublish(article: Article) {
  try {
    debugPage("unpublish article", article._id)
    await unpublishArticle(article._id)
    await loadDashboard()
  } catch (error) {
    console.error("[ContentDashboardPage] unpublish failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.unpublishError'))
  }
}

async function handleDelete(article: Article) {
  const confirmed = window.confirm(t('adminPages.contentList.deleteConfirm', { title: getLocalizedArticle(article, locale.value).displayTitle }))

  if (!confirmed) return

  try {
    debugPage("delete article", article._id)
    await deleteArticle(article._id)
    await loadDashboard()
  } catch (error) {
    console.error("[ContentDashboardPage] delete failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.deleteError'))
  }
}
</script>
