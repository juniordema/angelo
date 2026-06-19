<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div class="grid gap-5 md:grid-cols-2">
      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.title') }}
        </label>

        <input
            v-if="currentLanguage === 'fr'"
            v-model="form.title"
            type="text"
            required
            class="control"
        />

        <input
            v-else
            v-model="form.titleEn"
            type="text"
            required
            class="control"
        />
      </div>

      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.category') }}
        </label>

        <input
            v-if="currentLanguage === 'fr'"
            v-model="form.category"
            type="text"
            class="control"
        />

        <input
            v-else
            v-model="form.categoryEn"
            type="text"
            class="control"
        />
      </div>
    </div>

    <div class="field-group">
      <label class="block text-sm font-semibold text-warm-700">
        {{ t('adminPages.form.summary') }}
      </label>

      <textarea
          v-if="currentLanguage === 'fr'"
          v-model="form.excerpt"
          rows="3"
          class="textarea-control resize-none"
      />

      <textarea
          v-else
          v-model="form.excerptEn"
          rows="3"
          class="textarea-control resize-none"
      />
    </div>

    <div class="field-group">
      <label class="block text-sm font-semibold text-warm-700">
        {{ t('adminPages.form.content') }}
      </label>

      <textarea
          v-if="currentLanguage === 'fr'"
          v-model="form.content"
          rows="8"
          required
          class="textarea-control resize-y"
      />

      <textarea
          v-else
          v-model="form.contentEn"
          rows="8"
          required
          class="textarea-control resize-y"
      />
    </div>

    <div class="grid gap-5 md:grid-cols-2 md:items-start">
      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.image') }}
        </label>

        <label class="control control-file mt-2 cursor-pointer gap-3">
          <input
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleCoverImageChange"
          />

          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-50 text-primary-600">
            <i class="fas fa-image text-xs"></i>
          </span>

          <span class="min-w-0 flex-1 truncate text-sm text-warm-500">
            {{ selectedImageName || t('adminPages.form.imageUpload') }}
          </span>

          <span class="shrink-0 text-xs font-semibold text-primary-600">
            {{ selectedImageName ? t('adminPages.form.imageOk') : '+' }}
          </span>
        </label>

        <div
            v-if="selectedImageName || form.coverImage"
            class="mt-2 overflow-hidden rounded-lg border border-warm-200 bg-white shadow-sm"
        >
          <div class="border-b border-warm-100 px-3 py-2 text-xs font-semibold text-warm-600">
            {{ t('adminPages.form.imageSelected') }}:
            <span class="font-normal text-warm-500">
              {{ selectedImageName || imageLabel }}
            </span>
          </div>

          <img
              v-if="imagePreviewUrl || form.coverImage"
              :src="imagePreviewUrl || form.coverImage"
              :alt="t('adminPages.form.imagePreviewAlt')"
              class="h-20 w-full object-cover"
          />
        </div>
      </div>

      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.tags') }}
        </label>

        <input
            v-if="currentLanguage === 'fr'"
            v-model="tagsInput"
            type="text"
            class="control flex-1"
            :placeholder="t('adminPages.form.tagsPlaceholder')"
        />

        <input
            v-else
            v-model="tagsEnInput"
            type="text"
            class="control flex-1"
            placeholder="health, prevention, clinic"
        />
      </div>
    </div>

    <div class="grid gap-5 md:grid-cols-2 md:items-stretch">
      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.author') }}
        </label>

        <input v-model="form.author" type="text" class="control" />
      </div>

      <div class="field-group">
        <label class="block text-sm font-semibold text-warm-700">
          {{ t('adminPages.form.status') }}
        </label>

        <select v-model="form.status" class="control">
          <option value="draft">{{ t('adminPages.form.draft') }}</option>
          <option value="published">{{ t('adminPages.form.published') }}</option>
          <option value="scheduled">{{ t('adminPages.form.scheduled') }}</option>
          <option value="archived">{{ t('adminPages.form.archived') }}</option>
        </select>
      </div>
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button type="button" class="btn-secondary w-full sm:w-auto" @click="$emit('cancel')">
        {{ t('adminPages.form.cancel') }}
      </button>

      <button type="submit" class="btn-submit w-full sm:w-auto" :disabled="loading">
        {{ loading ? t('adminPages.form.saving') : t('adminPages.form.save') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Article } from '../content/services/contentService'
import { useLanguageStore } from '../../stores/languageStore'

type Lang = 'fr' | 'en'

type ArticlePayload = Partial<Article> & {
  imageFile?: File | null
  titleEn?: string
  excerptEn?: string
  contentEn?: string
  categoryEn?: string
  tagsEn?: string[]
}
const languageStore = useLanguageStore()

const currentLanguage = computed<'fr' | 'en'>(() => {
  return languageStore.currentLanguage === 'en' ? 'en' : 'fr'
})
const props = defineProps<{
  article?: ArticlePayload | null
  loading?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  submit: [payload: ArticlePayload]
  cancel: []
}>()

const { t } = useI18n()


const tagsInput = ref('')
const tagsEnInput = ref('')
const selectedImageName = ref('')
const selectedImageFile = ref<File | null>(null)
const imagePreviewUrl = ref('')

const form = reactive<ArticlePayload>({
  title: '',
  titleEn: '',
  excerpt: '',
  excerptEn: '',
  content: '',
  contentEn: '',
  coverImage: '',
  category: '',
  categoryEn: '',
  tags: [],
  tagsEn: [],
  author: 'Admin',
  status: 'draft'
})

watch(
    () => props.article,
    (article) => {
      if (!article) {
        resetForm()
        return
      }

      form.title = article.title || ''
      form.titleEn = article.titleEn || ''
      form.excerpt = article.excerpt || ''
      form.excerptEn = article.excerptEn || ''
      form.content = article.content || ''
      form.contentEn = article.contentEn || ''
      form.coverImage = article.coverImage || ''
      form.category = article.category || ''
      form.categoryEn = article.categoryEn || ''
      form.tags = article.tags || []
      form.tagsEn = article.tagsEn || []
      form.author = article.author || 'Admin'
      form.status = article.status || 'draft'

      tagsInput.value = article.tags?.join(', ') || ''
      tagsEnInput.value = article.tagsEn?.join(', ') || ''
      selectedImageName.value = ''
      selectedImageFile.value = null
      imagePreviewUrl.value = ''
    },
    { immediate: true }
)

function resetForm() {
  form.title = ''
  form.titleEn = ''
  form.excerpt = ''
  form.excerptEn = ''
  form.content = ''
  form.contentEn = ''
  form.coverImage = ''
  form.category = ''
  form.categoryEn = ''
  form.tags = []
  form.tagsEn = []
  form.author = 'Admin'
  form.status = 'draft'

  tagsInput.value = ''
  tagsEnInput.value = ''
  selectedImageName.value = ''
  selectedImageFile.value = null
  imagePreviewUrl.value = ''
}

function handleCoverImageChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) {
    selectedImageName.value = ''
    selectedImageFile.value = null
    imagePreviewUrl.value = ''
    return
  }

  const maxSize = 2 * 1024 * 1024

  if (file.size > maxSize) {
    alert(t('adminPages.form.imageTooLarge'))
    target.value = ''
    selectedImageName.value = ''
    selectedImageFile.value = null
    imagePreviewUrl.value = ''
    return
  }

  selectedImageName.value = file.name
  selectedImageFile.value = file
  imagePreviewUrl.value = URL.createObjectURL(file)
}

const imageLabel = computed(() => {
  if (selectedImageName.value) return selectedImageName.value
  if (form.coverImage) return form.coverImage
  return ''
})

function buildPayload(): ArticlePayload {
  const tags = tagsInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

  const tagsEn = tagsEnInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

  return {
    ...form,
    tags,
    tagsEn,
    imageFile: selectedImageFile.value
  }
}

function handleSubmit() {
  emit('submit', buildPayload())
}
</script>

<style scoped>
.control {
  @apply mt-2 flex h-12 w-full min-w-0 items-center rounded-lg border border-warm-200 px-4 py-3 text-sm outline-none focus:border-primary-500;
}

.control-file {
  @apply flex items-center;
}

.textarea-control {
  @apply mt-2 block w-full min-w-0 rounded-lg border border-warm-200 px-4 py-3 text-sm outline-none focus:border-primary-500;
}

.field-group {
  @apply flex h-full flex-col;
}

.btn-secondary {
  @apply rounded-lg border border-warm-200 px-5 py-3 text-sm font-semibold text-warm-700 hover:bg-warm-50;
}

.btn-submit {
  @apply rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-60;
}
</style>