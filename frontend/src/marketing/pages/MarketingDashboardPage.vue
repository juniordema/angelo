<template>
  <section class="space-y-6">
    <div>
      <h2 class="font-display text-3xl font-bold text-warm-900">{{ t('adminPages.marketing.dashboard.title') }}</h2>
      <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.marketing.dashboard.subtitle') }}</p>
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-warm-500 shadow-sm">
      {{ t('adminPages.marketing.dashboard.loading') }}
    </p>

    <div v-else class="grid gap-4 md:grid-cols-3">
      <MarketingStatsCard
        :label="t('adminPages.marketing.dashboard.leads')"
        :value="leads.length"
        icon="fas fa-user-plus"
        color="#0A6B5C"
        bg-class="bg-primary-50"
      />
      <MarketingStatsCard
        :label="t('adminPages.marketing.dashboard.campaigns')"
        :value="campaigns.length"
        icon="fas fa-bullhorn"
        color="#C9963B"
        bg-class="bg-accent-50"
      />
      <MarketingStatsCard
        :label="t('adminPages.marketing.dashboard.conversions')"
        :value="convertedLeads"
        icon="fas fa-chart-line"
        color="#3498DB"
        bg-class="bg-blue-50"
      />
    </div>

    <div v-if="!loading" class="grid gap-6 xl:grid-cols-2">
      <section>
        <h3 class="mb-3 font-semibold text-warm-900">{{ t('adminPages.marketing.dashboard.recentLeads') }}</h3>
        <LeadTable :leads="leads" />
      </section>
      <section>
        <h3 class="mb-3 font-semibold text-warm-900">{{ t('adminPages.marketing.dashboard.campaignsSection') }}</h3>
        <CampaignTable :campaigns="campaigns" />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CampaignTable from '../components/CampaignTable.vue'
import LeadTable from '../components/LeadTable.vue'
import MarketingStatsCard from '../components/MarketingStatsCard.vue'
import { getApiErrorMessage } from '../../shared/api/client'
import {
  fetchCampaigns,
  fetchLeads,
  type Campaign,
  type Lead
} from '../services/marketingService'

const leads = ref<Lead[]>([])
const campaigns = ref<Campaign[]>([])
const loading = ref(false)
const errorMessage = ref('')
const convertedLeads = computed(() => leads.value.filter((lead) => lead.status === 'converted').length)
const { t } = useI18n()

onMounted(() => {
  void loadDashboard()
})

async function loadDashboard() {
  loading.value = true
  errorMessage.value = ''

  try {
    const [nextLeads, nextCampaigns] = await Promise.all([fetchLeads(), fetchCampaigns()])
    leads.value = nextLeads
    campaigns.value = nextCampaigns
  } catch (error) {
    console.error('[MarketingDashboardPage] loadDashboard failed', error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.marketing.dashboard.error'))
  } finally {
    loading.value = false
  }
}
</script>
