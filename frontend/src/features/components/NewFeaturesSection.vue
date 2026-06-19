<template>
  <section id="marketing-hub" class="section-y bg-white border-y border-warm-200/70">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div class="anim-scroll">
          <span class="text-primary-500 font-semibold text-sm tracking-widest uppercase">Marketing</span>
          <h2 class="section-title font-display font-bold text-warm-900 mt-3 mb-4">
            Suivi des campagnes et des demandes patients
          </h2>
          <p class="text-warm-500 leading-relaxed">
            Centralisez les contacts entrants, suivez les campagnes et gardez une vue claire sur les actions prioritaires.
          </p>
          <router-link
            to="/admin"
            class="btn-primary mt-6 inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
          >
            Ouvrir le tableau de bord
            <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
        </div>

        <div class="grid gap-4 sm:grid-cols-3">
          <div
            v-for="item in features"
            :key="item.title"
            class="anim-scroll card-hover fluid-panel rounded-lg p-5"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg" :class="item.bgClass">
              <i :class="item.icon" :style="{ color: item.color }"></i>
            </div>
            <h3 class="font-display text-lg font-bold text-warm-900">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-warm-500">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Leads',
    description: 'Visualisez les demandes et priorisez les relances.',
    icon: 'fas fa-user-plus',
    color: '#0A6B5C',
    bgClass: 'bg-primary-50'
  },
  {
    title: 'Campagnes',
    description: 'Gardez le suivi des actions marketing en cours.',
    icon: 'fas fa-bullhorn',
    color: '#C9963B',
    bgClass: 'bg-accent-50'
  },
  {
    title: 'Indicateurs',
    description: 'Consultez rapidement les volumes et conversions.',
    icon: 'fas fa-chart-line',
    color: '#3498DB',
    bgClass: 'bg-blue-50'
  }
]
</script>
