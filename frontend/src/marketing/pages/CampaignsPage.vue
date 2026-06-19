<template>
  <section class="space-y-4">
    <div>
      <h2 class="font-display text-3xl font-bold text-warm-900">{{ t('adminPages.campaigns.title') }}</h2>
      <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.campaigns.subtitle') }}</p>
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-warm-500 shadow-sm">
      {{ t('adminPages.campaigns.loading') }}
    </p>

    <CampaignTable v-else :campaigns="campaigns" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CampaignTable from '../components/CampaignTable.vue'
import { getApiErrorMessage } from '../../shared/api/client'
import { fetchCampaigns, type Campaign } from '../services/marketingService'

const campaigns = ref<Campaign[]>([])
const loading = ref(false)
const errorMessage = ref('')
const { t } = useI18n()

onMounted(() => {
  void loadCampaigns()
})

async function loadCampaigns() {
  loading.value = true
  errorMessage.value = ''

  try {
    campaigns.value = await fetchCampaigns()
  } catch (error) {
    console.error('[CampaignsPage] loadCampaigns failed', error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.campaigns.error'))
  } finally {
    loading.value = false
  }
}
</script>
