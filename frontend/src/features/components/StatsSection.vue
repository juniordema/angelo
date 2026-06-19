<template>
  <section class="section-y bg-warm-50 border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 anim-scroll">
        <div class="max-w-2xl">
          <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">{{ $t('sections.stats') }}</span>
          <h2 class="section-title font-display font-bold text-warm-900 mt-3">{{ $t('stats.title') }}</h2>
          <p class="text-warm-500 mt-3">Une vue rapide sur l’activité et la capacité clinique.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <div
          v-for="(stat, index) in localizedStats"
          :key="stat.label"
          class="anim-scroll card-hover fluid-panel rounded-lg p-5 border-t-2"
          :class="[stat.borderClass, `delay-${index}`]"
        >
          <div class="w-11 h-11 rounded-lg flex items-center justify-center mb-4" :class="stat.bgClass">
            <i :class="stat.icon" :style="{ color: stat.color }"></i>
          </div>
          <div class="font-display font-bold text-3xl text-warm-900 mb-1">{{ stat.value }}</div>
          <div class="text-warm-500 text-sm">{{ stat.displayLabel }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeContent } from '../../shared/composables/useHomeContent'

const { locale } = useI18n()
const { content } = useHomeContent()

const localizedStats = computed(() =>
  (content.value?.stats ?? []).map((stat) => ({
    ...stat,
    displayLabel: locale.value === 'en' ? stat.labelEn || stat.label : stat.label,
    borderClass: stat.bgClass === 'bg-primary-50'
      ? 'border-t-blue-500'
      : stat.bgClass === 'bg-accent-50'
        ? 'border-t-emerald-500'
        : stat.bgClass === 'bg-red-50'
          ? 'border-t-violet-500'
          : 'border-t-amber-500'
  }))
)
</script>
