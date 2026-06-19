<template>
  <main class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-semibold text-primary-700">{{ t('admin.contentHub') }}</p>
        <h1 class="text-2xl font-bold text-warm-900 sm:text-3xl">
          {{ t('adminPages.contentList.title') }}
        </h1>
        <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.contentList.subtitle') }}</p>
      </div>

      <RouterLink
        to="/admin/content/articles/new"
        class="rounded-lg bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-primary-700"
      >
        {{ t('adminPages.contentList.create') }}
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <ArticleStatsCard :title="t('adminPages.contentList.total')" :value="articles.length" icon="fas fa-newspaper" icon-bg-class="bg-primary-50" icon-text-class="text-primary-700" />
      <ArticleStatsCard :title="t('adminPages.contentList.published')" :value="publishedCount" icon="fas fa-check" icon-bg-class="bg-green-50" icon-text-class="text-green-700" />
      <ArticleStatsCard :title="t('adminPages.contentList.drafts')" :value="draftCount" icon="fas fa-pen" icon-bg-class="bg-warm-100" icon-text-class="text-warm-700" />
      <ArticleStatsCard :title="t('adminPages.contentList.views')" :value="totalViews" icon="fas fa-eye" icon-bg-class="bg-blue-50" icon-text-class="text-blue-700" />
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-warm-500 shadow-sm">
      {{ t('adminPages.contentList.loading') }}
    </p>

    <ArticleTable
      v-else
      :articles="articles"
      @edit="editArticle"
      @publish="handlePublish"
      @unpublish="handleUnpublish"
      @delete="handleDelete"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getApiErrorMessage } from '../../../shared/api/client'
import ArticleTable from '../../components/ArticleTable.vue'
import ArticleStatsCard from '../../components/ArticleStatsCard.vue'
import {
  deleteArticle,
  fetchArticles,
  publishArticle,
  translateArticle,
  unpublishArticle,
  type Article
} from '../services/contentService'
import { getLocalizedArticle } from '../utils/articleLocalization'

const router = useRouter()
const { t, locale } = useI18n()

const articles = ref<Article[]>([])
const loading = ref(false)
const errorMessage = ref('')
const translatedArticleIds = new Set<string>()

const publishedCount = computed(() =>
  articles.value.filter((article) => article.status === 'published').length
)

const draftCount = computed(() =>
  articles.value.filter((article) => article.status === 'draft').length
)

const totalViews = computed(() =>
  articles.value.reduce((sum, article) => sum + (article.views || 0), 0)
)

function debugPage(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[ContentArticlesPage] ${message}`, payload ?? "")
  }
}

onMounted(() => {
  debugPage("mounted")
  loadArticles()
})

watch(
  () => locale.value,
  () => {
    void hydrateEnglishTranslations()
  }
)

async function loadArticles() {
  try {
    loading.value = true
    errorMessage.value = ''
    debugPage("loading articles")

    articles.value = await fetchArticles()
    await hydrateEnglishTranslations()

    debugPage("articles loaded", { count: articles.value.length })
  } catch (error) {
    console.error("[ContentArticlesPage] loadArticles failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.error'))
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
    await publishArticle(article._id)

    const articleUrl = `${window.location.origin}/articles/${article.slug}`

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
        '_blank',
        'noopener,noreferrer'
    )

    window.open(
        `https://wa.me/?text=${encodeURIComponent(getLocalizedArticle(article, locale.value).displayTitle + ' ' + articleUrl)}`,
        '_blank',
        'noopener,noreferrer'
    )

    await loadArticles()
  } catch {
    errorMessage.value = t('adminPages.contentList.publishError')
  }
}

async function handleUnpublish(article: Article) {
  try {
    debugPage("unpublish article", article._id)
    await unpublishArticle(article._id)
    await loadArticles()
  } catch (error) {
    console.error("[ContentArticlesPage] unpublish failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.unpublishError'))
  }
}

async function handleDelete(article: Article) {
  const confirmed = window.confirm(t('adminPages.contentList.deleteConfirm', { title: getLocalizedArticle(article, locale.value).displayTitle }))

  if (!confirmed) return

  try {
    debugPage("delete article", article._id)
    await deleteArticle(article._id)
    await loadArticles()
  } catch (error) {
    console.error("[ContentArticlesPage] delete failed", error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentList.deleteError'))
  }
}
</script>
