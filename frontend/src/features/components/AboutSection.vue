<template>
  <section id="about" class="section-y border-y border-warm-200/70 bg-gradient-to-b from-warm-50 to-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-16">
        <div class="anim-scroll">
          <div class="relative">
            <div class="absolute -left-4 -top-4 hidden h-32 w-32 rounded-3xl bg-primary-100 sm:block"></div>
            <div class="absolute -bottom-4 -right-4 hidden h-32 w-32 rounded-3xl bg-accent-100 sm:block"></div>

            <div class="relative overflow-hidden rounded-3xl border border-warm-200 bg-white shadow-xl shadow-warm-900/10">
              <img
                  :src="exterieurImage"
                  alt="Extérieur de la Clinique Angelo"
                  class="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-warm-950/60 via-transparent to-transparent"></div>

              <div class="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-primary-600">
                      {{ $t('about.location') }}
                    </p>
                    <p class="mt-1 text-sm font-bold text-warm-900">
                      Logpom, Douala
                    </p>
                  </div>

                  <div class="text-right">
                    <p class="text-xs font-bold uppercase tracking-widest text-warm-400">
                      {{ $t('about.yearCreated') }}
                    </p>
                    <p class="mt-1 text-sm font-bold text-warm-900">
                      2021
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="anim-scroll">
            <span class="text-sm font-semibold uppercase tracking-widest text-primary-500">
              {{ $t('sections.about') }}
            </span>

            <h2 class="section-title font-display mt-3 mb-4 font-bold text-warm-900">
              {{ $t('about.title') }}
            </h2>

            <p class="max-w-xl text-base leading-7 text-warm-500 sm:text-lg">
              {{ $t('about.subtitle') }}
            </p>
          </div>

          <p class="anim-scroll delay-1 max-w-2xl text-sm leading-8 text-warm-600 sm:text-base">
            {{ $t('about.description') }}
          </p>

          <div class="anim-scroll delay-2 grid gap-4 sm:grid-cols-2">
            <article
                v-for="item in aboutCards"
                :key="item.title"
                class="group rounded-2xl border border-warm-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
                :class="{ 'cursor-pointer': item.action === 'team' }"
                @click="item.action === 'team' ? openTeamModal() : null"
            >
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 transition group-hover:scale-105">
                <i :class="item.icon" class="text-lg text-primary-600"></i>
              </div>

              <h3 class="text-sm font-bold text-warm-900">
                {{ item.title }}
              </h3>

              <p class="mt-2 text-xs leading-6 text-warm-500">
                {{ item.text }}
              </p>

              <span
                  v-if="item.action === 'team'"
                  class="mt-4 inline-flex items-center gap-2 text-xs font-bold text-primary-700"
              >
                Voir les membres
                <i class="fas fa-arrow-right text-[10px]"></i>
              </span>
            </article>
          </div>

          <div class="anim-scroll delay-3 flex flex-col gap-3 sm:flex-row">
            <a
                href="#services"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-700"
            >
              {{ $t('nav.services') }}
              <i class="fas fa-arrow-right text-xs"></i>
            </a>

            <a
                href="#contact"
                class="inline-flex items-center justify-center gap-2 rounded-xl border border-warm-200 bg-white px-6 py-3 text-sm font-bold text-warm-700 transition hover:bg-warm-50"
            >
              {{ $t('sections.contact') }}
              <i class="fas fa-phone text-xs"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
          v-if="showTeamModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          @click.self="closeTeamModal"
      >
        <div class="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
          <div class="mb-6 flex items-start justify-between gap-4">
            <div>
              <p class="text-sm font-semibold text-primary-700">
                Notre équipe
              </p>

              <h2 class="mt-2 text-2xl font-bold text-warm-900 sm:text-3xl">
                Membres de la Clinique Angelo
              </h2>

              <p class="mt-2 max-w-2xl text-sm leading-7 text-warm-500">
                Les photos des membres pourront être ajoutées plus tard. Cette section est déjà prête pour accueillir l’équipe médicale et administrative.
              </p>
            </div>

            <button
                type="button"
                class="rounded-full bg-warm-100 px-3 py-2 text-sm font-bold text-warm-700 hover:bg-warm-200"
                @click="closeTeamModal"
            >
              ✕
            </button>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
                v-for="member in teamMembers"
                :key="member.name + member.role"
                class="rounded-2xl border border-warm-200 bg-gradient-to-b from-warm-50 to-white p-5 text-center shadow-sm"
            >
              <div class="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-primary-50">
                <img
                    v-if="member.image"
                    :src="member.image"
                    :alt="member.name"
                    class="h-full w-full object-cover"
                />
                <i v-else class="fas fa-user-md text-4xl text-primary-600"></i>
              </div>

              <h3 class="mt-4 font-bold text-warm-900">
                {{ member.name }}
              </h3>

              <p class="mt-1 text-sm text-warm-500">
                {{ member.role }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import exterieurImage from '../../assets/images/clinic/exterieur.png'

const showTeamModal = ref(false)

const aboutCards = [
  {
    title: 'Mission',
    text: 'Offrir des soins accessibles, humains et de qualité à chaque patient.',
    icon: 'fas fa-bullseye'
  },
  {
    title: 'Vision',
    text: 'Devenir une référence médicale de proximité pour les familles.',
    icon: 'fas fa-eye'
  },
  {
    title: 'Valeurs',
    text: 'Écoute, respect, confidentialité, compassion et professionnalisme.',
    icon: 'fas fa-heart'
  },
  {
    title: 'Équipe',
    text: 'Découvrez les membres médicaux et administratifs de la clinique.',
    icon: 'fas fa-users',
    action: 'team'
  }
]

const teamMembers = [
  {
    name: 'Membre de l’équipe',
    role: 'Médecin',
    image: ''
  },
  {
    name: 'Membre de l’équipe',
    role: 'Infirmier / Infirmière',
    image: ''
  },
  {
    name: 'Membre de l’équipe',
    role: 'Accueil / Administration',
    image: ''
  }
]

function openTeamModal() {
  showTeamModal.value = true
}

function closeTeamModal() {
  showTeamModal.value = false
}
</script>