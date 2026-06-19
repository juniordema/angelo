<template>
  <main class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm font-semibold text-primary-700">{{ t('admin.contentHub') }}</p>
        <h1 class="text-2xl font-bold text-warm-900 sm:text-3xl">
          {{ isEditMode ? t('adminPages.contentEditor.editTitle') : t('adminPages.contentEditor.createTitle') }}
        </h1>
        <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.contentEditor.subtitle') }}</p>
      </div>

      <RouterLink
          to="/admin/content/articles"
          class="rounded-lg border border-warm-200 px-4 py-3 text-center text-sm font-semibold text-warm-700 hover:bg-warm-50"
      >
        {{ t('adminPages.contentEditor.back') }}
      </RouterLink>
    </div>

    <section class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm sm:p-6">
      <p v-if="loading && isEditMode && !article" class="text-sm font-semibold text-warm-500">
        {{ t('adminPages.contentEditor.loading') }}
      </p>

      <ArticleForm
          v-else
          :article="article"
          :loading="loading"
          :translating="translating"
          :error-message="errorMessage"
          @submit="handleSubmit"
          @cancel="goBack"
          @translate="handleTranslate"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { getApiErrorMessage } from '../../../shared/api/client'
import ArticleForm from '../../components/ArticleForm.vue'
import {
  fetchArticles,
  createArticleWithImage,
  updateArticleWithImage,
  translateArticle,
  type Article
} from '../services/contentService'

type ArticlePayload = Partial<Article> & {
  imageFile?: File | null
  titleEn?: string
  excerptEn?: string
  contentEn?: string
  categoryEn?: string
  tagsEn?: string[]
}

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const article = ref<ArticlePayload | null>(null)
const loading = ref(false)
const translating = ref(false)
const errorMessage = ref('')

const articleId = computed(() => route.params.id as string | undefined)
const isEditMode = computed(() => Boolean(articleId.value))

function debugPage(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[ArticleEditorPage] ${message}`, payload ?? '')
  }
}

onMounted(() => {
  debugPage('mounted', {
    isEditMode: isEditMode.value,
    articleId: articleId.value
  })
})

watch(
    articleId,
    () => {
      loadArticleForEdit()
    },
    { immediate: true }
)

async function loadArticleForEdit() {
  article.value = null
  if (!isEditMode.value || !articleId.value) return

  try {
    loading.value = true
    errorMessage.value = ''
    debugPage('loading article for edit', articleId.value)

    const articles = await fetchArticles()
    const foundArticle = articles.find((item) => item._id === articleId.value)

    if (!foundArticle) {
      errorMessage.value = t('adminPages.contentEditor.notFound')
      debugPage('article not found', articleId.value)
      return
    }

    article.value = foundArticle
    debugPage('article loaded for edit', foundArticle)
  } catch (error) {
    console.error('[ArticleEditorPage] load article failed', error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.contentEditor.loadError'))
  } finally {
    loading.value = false
  }
}

async function handleTranslate(payload: ArticlePayload) {
  try {
    translating.value = true
    errorMessage.value = ''

    const translated = await translateArticle({
      title: payload.title,
      excerpt: payload.excerpt,
      content: payload.content,
      category: payload.category,
      tags: payload.tags
    })

    article.value = {
      ...article.value,
      ...payload,
      titleEn: translated.titleEn || '',
      excerptEn: translated.excerptEn || '',
      contentEn: translated.contentEn || '',
      categoryEn: translated.categoryEn || '',
      tagsEn: translated.tagsEn || []
    }
  } catch (error) {
    console.error('[ArticleEditorPage] translate failed', error)
    errorMessage.value = t('adminPages.contentEditor.translateError')
  } finally {
    translating.value = false
  }
}

async function handleSubmit(payload: ArticlePayload) {
  try {
    loading.value = true
    errorMessage.value = ''

    const formData = new FormData()

    formData.append('title', payload.title || '')
    formData.append('titleEn', payload.titleEn || '')
    formData.append('excerpt', payload.excerpt || '')
    formData.append('excerptEn', payload.excerptEn || '')
    formData.append('content', payload.content || '')
    formData.append('contentEn', payload.contentEn || '')
    formData.append('category', payload.category || '')
    formData.append('categoryEn', payload.categoryEn || '')
    formData.append('author', payload.author || 'Admin')
    formData.append('status', payload.status || 'draft')

    if (payload.tags) {
      formData.append('tags', JSON.stringify(payload.tags))
    }

    if (payload.tagsEn) {
      formData.append('tagsEn', JSON.stringify(payload.tagsEn))
    }

    if (payload.coverImage) {
      formData.append('coverImage', payload.coverImage)
    }

    if (payload.imageFile) {
      formData.append('image', payload.imageFile)
    }

    if (isEditMode.value && articleId.value) {
      await updateArticleWithImage(articleId.value, formData)
    } else {
      await createArticleWithImage(formData)
    }

    router.push('/admin/content/articles')
  } catch (error) {
    console.error('[ArticleEditorPage] save failed', error)
    errorMessage.value = t('adminPages.contentEditor.saveError')
  } finally {
    loading.value = false
  }
}

function goBack() {
  debugPage('cancel')
  router.push('/admin/content/articles')
}
</script>
