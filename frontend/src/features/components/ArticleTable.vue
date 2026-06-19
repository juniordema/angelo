<template>
  <section class="space-y-4">
    <div v-if="articles.length === 0" class="rounded-2xl border border-warm-200 bg-white p-6 text-center">
      <p class="font-semibold text-warm-800">{{ t('adminPages.table.emptyTitle') }}</p>
      <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.table.emptyDescription') }}</p>
    </div>

    <!-- Mobile cards -->
    <div class="space-y-3 md:hidden">
      <article
          v-for="article in localizedArticles"
          :key="article._id"
          class="rounded-2xl border border-warm-200 bg-white p-4 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <h3 class="font-semibold text-warm-900">
              {{ article.displayTitle }}
            </h3>
            <p class="mt-1 text-xs text-warm-500">
              {{ article.displayCategory || t('adminPages.table.noCategory') }}
            </p>
          </div>

          <span class="badge" :class="statusClass(article.status)">
            {{ statusLabel(article.status) }}
          </span>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p class="text-xs text-warm-500">{{ t('adminPages.table.views') }}</p>
            <p class="font-bold text-warm-900">{{ article.views || 0 }}</p>
          </div>

          <div>
            <p class="text-xs text-warm-500">{{ t('adminPages.table.shares') }}</p>
            <p class="font-bold text-warm-900">{{ totalShares(article) }}</p>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button class="action-btn" @click="$emit('edit', article)">
            {{ t('adminPages.table.edit') }}
          </button>

            <button
              v-if="article.status !== 'published'"
              class="action-btn text-primary-700"
              @click="$emit('publish', article)"
            >
            {{ t('adminPages.table.publish') }}
            </button>

            <button
              v-else
              class="action-btn text-amber-700"
              @click="$emit('unpublish', article)"
            >
            {{ t('adminPages.table.unpublish') }}
            </button>

          <button class="action-btn text-red-600" @click="$emit('delete', article)">
            {{ t('adminPages.table.delete') }}
          </button>
        </div>
      </article>
    </div>

    <div class="hidden overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-warm-200">
          <thead class="bg-warm-50">
          <tr>
            <th class="table-th">{{ t('adminPages.table.article') }}</th>
            <th class="table-th">{{ t('adminPages.table.status') }}</th>
            <th class="table-th">{{ t('adminPages.table.category') }}</th>
            <th class="table-th">{{ t('adminPages.table.views') }}</th>
            <th class="table-th">{{ t('adminPages.table.shares') }}</th>
            <th class="table-th text-right">{{ t('adminPages.table.actions') }}</th>
          </tr>
          </thead>

          <tbody class="divide-y divide-warm-100">
          <tr v-for="article in localizedArticles" :key="article._id" class="hover:bg-warm-50/70">
            <td class="table-td">
              <div>
                <p class="font-semibold text-warm-900">{{ article.displayTitle }}</p>
                <p class="text-xs text-warm-500">{{ article.slug }}</p>
              </div>
            </td>

            <td class="table-td">
                <span class="badge" :class="statusClass(article.status)">
                  {{ statusLabel(article.status) }}
                </span>
            </td>

            <td class="table-td">
              {{ article.displayCategory || t('adminPages.table.noCategory') }}
            </td>

            <td class="table-td">
              {{ article.views || 0 }}
            </td>

            <td class="table-td">
              {{ totalShares(article) }}
            </td>

            <td class="table-td">
              <div class="flex justify-end gap-2">
                <button class="action-btn" @click="$emit('edit', article)">
                  {{ t('adminPages.table.edit') }}
                </button>

                <button
                    v-if="article.status !== 'published'"
                    class="action-btn text-primary-700"
                    @click="$emit('publish', article)"
                >
                  {{ t('adminPages.table.publish') }}
                </button>

                <button
                    v-else
                    class="action-btn text-amber-700"
                    @click="$emit('unpublish', article)"
                >
                  {{ t('adminPages.table.unpublish') }}
                </button>

                <button class="action-btn text-red-600" @click="$emit('delete', article)">
                  {{ t('adminPages.table.delete') }}
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Article } from '../content/services/contentService'
import { getLocalizedArticle } from '../content/utils/articleLocalization'

const { t, locale } = useI18n()

const props = defineProps<{
  articles: Article[]
}>()

defineEmits<{
  edit: [article: Article]
  publish: [article: Article]
  unpublish: [article: Article]
  delete: [article: Article]
}>()

const localizedArticles = computed(() =>
  props.articles.map((article) => getLocalizedArticle(article, locale.value))
)

function totalShares(article: Article) {
  return (
      (article.shares?.whatsapp || 0) +
      (article.shares?.facebook || 0) +
      (article.shares?.linkedin || 0) +
      (article.shares?.twitter || 0) +
      (article.shares?.copyLink || 0)
  )
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    draft: t('adminPages.table.draft'),
    published: t('adminPages.table.published'),
    scheduled: t('adminPages.table.scheduled'),
    archived: t('adminPages.table.archived')
  }

  return labels[status] || status
}

function statusClass(status: string) {
  const classes: Record<string, string> = {
    draft: 'bg-warm-100 text-warm-700',
    published: 'bg-green-50 text-green-700',
    scheduled: 'bg-blue-50 text-blue-700',
    archived: 'bg-red-50 text-red-700'
  }

  return classes[status] || 'bg-warm-100 text-warm-700'
}
</script>

<style scoped>
.table-th {
  @apply px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-warm-500;
}

.table-td {
  @apply px-4 py-4 text-sm text-warm-700;
}

.badge {
  @apply inline-flex rounded-full px-2.5 py-1 text-xs font-bold;
}

.action-btn {
  @apply rounded-lg px-3 py-2 text-xs font-bold hover:bg-warm-100;
}
</style>
