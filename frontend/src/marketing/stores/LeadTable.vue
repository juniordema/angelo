<template>
  <LeadTable :leads="fallbackLeads" />
</template>

<script setup lang="ts">
import LeadTable from '../components/LeadTable.vue'
import { fallbackLeads } from '../services/marketingService'
</script>
