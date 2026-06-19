<template>
  <section id="contact" class="section-y bg-gradient-to-b from-warm-50 to-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="anim-scroll mx-auto mb-10 max-w-2xl text-center sm:mb-14">
        <span class="text-sm font-semibold uppercase tracking-widest text-primary-500">
          {{ $t('sections.contact') }}
        </span>

        <h2 class="section-title font-display mt-3 mb-4 font-bold text-warm-900">
          {{ $t('contact.title') }}
        </h2>

        <p class="text-sm leading-7 text-warm-500 sm:text-base">
          Retrouvez facilement la Clinique Angelo et contactez notre équipe pour toute information ou prise de rendez-vous.
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <article
            v-for="(item, index) in contactCards"
            :key="item.title"
            class="anim-scroll group rounded-2xl border border-warm-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl"
            :class="`delay-${index + 1}`"
        >
          <div class="flex items-start gap-4">
            <div
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition group-hover:scale-105"
                :class="item.bgClass"
            >
              <i :class="item.icon" class="text-2xl" :style="{ color: item.color }"></i>
            </div>

            <div>
              <h3 class="font-display text-lg font-bold text-warm-900">
                {{ item.title }}
              </h3>

              <div
                  v-if="item.title === 'Contact'"
                  class="mt-2 space-y-2 text-sm leading-7 text-warm-500"
              >
                <p>
                  Tél :
                  <a
                      :href="phoneLink"
                      class="font-semibold text-primary-700 hover:underline"
                  >
                    {{ clinicPhone }}
                  </a>
                </p>

                <p>
                  Email :
                  <a
                      :href="gmailLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-primary-700 hover:underline"
                  >
                    {{ clinicEmail }}
                  </a>
                </p>

                <p>
                  WhatsApp :
                  <a
                      :href="whatsappLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-primary-700 hover:underline"
                  >
                    {{ clinicPhone }}
                  </a>
                </p>
              </div>

              <p
                  v-else
                  class="mt-2 text-sm leading-7 text-warm-500"
                  v-html="item.text"
              ></p>
            </div>
          </div>
        </article>
      </div>

      <div class="anim-scroll mt-10 overflow-hidden rounded-3xl border border-warm-200 bg-white shadow-xl shadow-warm-900/5">
        <div class="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div class="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-6 text-white sm:p-8 lg:p-10">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <i class="fas fa-map-marker-alt text-2xl text-white"></i>
            </div>

            <h3 class="font-display mt-6 text-2xl font-bold sm:text-3xl">
              Visitez la Clinique Angelo
            </h3>

            <p class="mt-4 text-sm leading-7 text-primary-50 sm:text-base">
              Notre équipe vous accueille dans un cadre professionnel, accessible et rassurant à Logpom, Douala.
            </p>

            <div class="mt-6 space-y-4">
              <div class="flex gap-3">
                <i class="fas fa-location-dot mt-1 text-accent-300"></i>
                <div>
                  <p class="text-sm font-bold text-white">Adresse</p>
                  <p class="text-sm text-primary-50">Logpom, Douala, en face de Gar Bon Bar</p>
                </div>
              </div>

              <div class="flex gap-3">
                <i class="fas fa-phone mt-1 text-accent-300"></i>
                <div>
                  <p class="text-sm font-bold text-white">Téléphone</p>
                  <a :href="phoneLink" class="text-sm text-primary-50 hover:underline">
                    {{ clinicPhone }}
                  </a>
                </div>
              </div>

              <div class="flex gap-3">
                <i class="fas fa-envelope mt-1 text-accent-300"></i>
                <div>
                  <p class="text-sm font-bold text-white">Email</p>
                  <a
                      :href="gmailLink"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm text-primary-50 hover:underline"
                  >
                    {{ clinicEmail }}
                  </a>
                </div>
              </div>
            </div>

            <a
                :href="mapLinkUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary-700 transition hover:bg-primary-50 sm:w-auto"
            >
              <i class="fas fa-location-arrow"></i>
              Ouvrir dans Maps
            </a>
          </div>

          <div class="h-[320px] sm:h-[420px] lg:h-auto">
            <iframe
                :src="mapEmbedUrl"
                class="h-full w-full border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
                title="Carte Clinique Angelo"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import { contactInfos } from '../data/contactInfos'
import { getSettings } from '../services/settingsService'

const clinicPhone = '+237 6 90 83 69 01'
const clinicEmail = 'angloclinique@gmail.com'

const phoneLink = `tel:${clinicPhone.replace(/\s+/g, '')}`
const whatsappLink = `https://wa.me/${clinicPhone.replace(/\D/g, '')}`
const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(clinicEmail)}`

const mapQuery = encodeURIComponent('Clinique Angelo Logpom Douala en face de Gar Bon Bar')
const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=17&output=embed`
const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

const settings = ref<{ phone?: string; email?: string } | null>(null)

onMounted(async () => {
  try {
    settings.value = await getSettings()
  } catch (error) {
    console.error('[ContactSection] getSettings failed', error)
  }
})

const contactCards = computed(() => contactInfos)
</script>