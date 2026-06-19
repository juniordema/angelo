<template>
  <div class="overflow-hidden rounded-lg border border-warm-200 bg-white">
    <table class="w-full border-collapse text-left text-sm">
      <thead class="bg-warm-50 text-warm-500">
        <tr>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.campaigns.campaign') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.campaigns.channel') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.campaigns.budget') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.campaigns.objective') }}</th>
          <th class="px-4 py-3 font-semibold">{{ t('adminPages.marketing.campaigns.status') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign._id" class="border-t border-warm-100">
          <td class="px-4 py-3 font-semibold text-warm-900">{{ campaign.name }}</td>
          <td class="px-4 py-3 text-warm-500">{{ channelLabel(campaign.channel) }}</td>
          <td class="px-4 py-3 text-warm-500">{{ formatCurrency(campaign.budget) }}</td>
          <td class="px-4 py-3 text-warm-500">{{ campaign.objective || t('adminPages.marketing.campaigns.noneDefined') }}</td>
          <td class="px-4 py-3">
            <span class="rounded-lg bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700">
              {{ statusLabel(campaign.status) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Campaign } from '../services/marketingService'

const { t } = useI18n()

defineProps<{
  campaigns: Campaign[]
}>()

const formatter = new Intl.NumberFormat('fr-CM', {
  style: 'currency',
  currency: 'XAF',
  maximumFractionDigits: 0
})

function formatCurrency(value: number) {
  return formatter.format(value)
}

function statusLabel(status: Campaign['status']) {
  const labels: Record<Campaign['status'], string> = {
    draft: t('adminPages.marketing.campaigns.draft'),
    scheduled: t('adminPages.marketing.campaigns.scheduled'),
    active: t('adminPages.marketing.campaigns.active'),
    completed: t('adminPages.marketing.campaigns.completed'),
    paused: t('adminPages.marketing.campaigns.paused')
  }

  return labels[status]
}

function channelLabel(channel: Campaign['channel']) {
  const labels: Record<string, string> = {
    email: t('adminPages.marketing.campaigns.email'),
    social: t('adminPages.marketing.campaigns.social'),
    seo: t('adminPages.marketing.campaigns.seo'),
    ads: t('adminPages.marketing.campaigns.ads'),
    referral: t('adminPages.marketing.campaigns.referral')
  }

  return labels[channel] || channel
}
</script>
