<template>
  <section class="section-y relative overflow-hidden" style="background: linear-gradient(135deg, #022F28, #0A6B5C 48%, #064D42); z-index: 0;">
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
        <div class="anim-scroll">
          <span class="text-primary-100 font-semibold text-sm tracking-widest uppercase">Clinique Angelo</span>
          <h2 class="section-title font-display font-bold text-white mt-3 mb-4 max-w-2xl">
            {{ $t('cta.title') }}
          </h2>
          <p class="text-primary-100/85 text-lg max-w-2xl leading-relaxed mb-8">{{ $t('cta.description') }}</p>
          <div class="flex flex-wrap gap-4">
            <button @click="openAppointment()" class="btn-accent px-8 py-4 rounded-lg font-semibold text-base flex items-center gap-3">
              <i class="fas fa-calendar-plus"></i> {{ $t('cta.button') }}
            </button>
            <a href="tel:+237699887766" class="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-base hover:-translate-y-0.5 hover:bg-white/20 transition-all duration-300 flex items-center gap-3">
              <i class="fas fa-phone"></i> +237 6 90 83 69 01
            </a>
          </div>
        </div>

        <div class="anim-scroll rounded-lg border border-white/15 bg-white/10 p-6 shadow-xl shadow-primary-950/20 backdrop-blur-md">
          <div class="grid sm:grid-cols-3 gap-4">
            <div class="rounded-lg bg-white/10 p-4 border border-white/10">
              <div class="text-white font-display text-2xl font-bold">24/7</div>
              <div class="text-primary-100 text-sm mt-1">Urgences</div>
            </div>
            <div class="rounded-lg bg-white/10 p-4 border border-white/10">
              <div class="text-white font-display text-2xl font-bold">15+</div>
              <div class="text-primary-100 text-sm mt-1">Spécialistes</div>
            </div>
            <div class="rounded-lg bg-white/10 p-4 border border-white/10">
              <div class="text-white font-display text-2xl font-bold">10k+</div>
              <div class="text-primary-100 text-sm mt-1">Patients suivis</div>
            </div>
          </div>
          <div class="mt-5 rounded-lg bg-white/10 p-4 border border-white/10 text-white">
            <div class="text-sm font-semibold mb-2">Réponse rapide</div>
            <p class="text-sm text-primary-100/85 leading-relaxed">Prenez rendez-vous, suivez vos demandes et retrouvez tous les points de contact au même endroit.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
function openAppointment() {
  window.appModals?.openAppointment?.()
}
</script>
