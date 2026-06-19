<template>
  <section class="space-y-4">
    <div>
      <h2 class="font-display text-3xl font-bold text-warm-900">{{ t('adminPages.leads.title') }}</h2>
      <p class="mt-1 text-sm text-warm-500">{{ t('adminPages.leads.subtitle') }}</p>
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {{ errorMessage }}
    </p>

    <p v-if="loading" class="rounded-lg bg-white px-4 py-3 text-sm font-semibold text-warm-500 shadow-sm">
      {{ t('adminPages.leads.loading') }}
    </p>

    <LeadTable v-else :leads="leads" />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import LeadTable from '../components/LeadTable.vue'
import { getApiErrorMessage } from '../../shared/api/client'
import { fetchLeads, type Lead } from '../services/marketingService'

const leads = ref<Lead[]>([])
const loading = ref(false)
const errorMessage = ref('')
const { t } = useI18n()

onMounted(() => {
  void loadLeads()
})

async function loadLeads() {
  loading.value = true
  errorMessage.value = ''

  try {
    leads.value = await fetchLeads()
  } catch (error) {
    console.error('[LeadsPage] loadLeads failed', error)
    errorMessage.value = getApiErrorMessage(error, t('adminPages.leads.error'))
  } finally {
    loading.value = false
  }
}
</script>
