<template>
  <div class="overflow-hidden rounded-lg border border-warm-200 bg-white">
    <table class="w-full border-collapse text-left text-sm">
      <thead class="bg-warm-50 text-warm-500">
        <tr>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.leads.patient') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.leads.contact') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.leads.source') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.leads.status') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead._id" class="border-t border-warm-100">
          <td class="px-4 py-3 font-semibold text-warm-900">{{ lead.name }}</td>
          <td class="px-4 py-3 text-warm-500">
            <div>{{ lead.phone || '-' }}</div>
            <div v-if="lead.email" class="text-xs text-warm-400">{{ lead.email }}</div>
          </td>
          <td class="px-4 py-3 text-warm-500">{{ lead.source }}</td>
          <td class="px-4 py-3">
            <span class="rounded-lg bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700">
              {{ statusLabel(lead.status) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Lead } from '../services/marketingService'

const { t } = useI18n()

defineProps<{
  leads: Lead[]
}>()

function statusLabel(status: Lead['status']) {
  const labels: Record<Lead['status'], string> = {
    new: t('adminPages.marketing.leads.new'),
    contacted: t('adminPages.marketing.leads.contacted'),
    qualified: t('adminPages.marketing.leads.qualified'),
    converted: t('adminPages.marketing.leads.converted'),
    lost: t('adminPages.marketing.leads.lost')
  }

  return labels[status]
}
</script>
