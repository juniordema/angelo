<template>
  <RouterView />
  <ToastContainer />

  <Teleport to="body">
    <Transition name="doctor-modal">
      <div
        v-if="selectedDoctor"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-warm-950/70 px-4 py-6 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="`Informations du Dr. ${selectedDoctor.name}`"
        @click.self="closeDoctorDetail"
      >
        <article class="w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl shadow-warm-900/25">
          <div class="grid lg:grid-cols-[0.92fr_1.08fr]">
            <div class="relative min-h-[280px] bg-warm-100 lg:min-h-full">
              <img
                :src="selectedDoctor.photo"
                :alt="selectedDoctor.name"
                class="h-full w-full object-cover object-top"
              />
              <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-warm-950/65 to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                <div class="rounded-lg bg-white/95 px-4 py-2 shadow-sm backdrop-blur">
                  <p class="text-xs font-semibold uppercase tracking-widest text-primary-600">Docteur</p>
                  <p class="mt-1 text-lg font-bold text-warm-900">{{ selectedDoctor.name }}</p>
                </div>
                <button
                  type="button"
                  class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/95 text-warm-700 shadow-sm transition hover:bg-red-50 hover:text-red-700"
                  aria-label="Fermer"
                  @click="closeDoctorDetail"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div class="max-h-[82vh] overflow-y-auto p-5 sm:p-7">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-widest text-primary-600">
                    {{ selectedDoctor.specialty }}
                  </p>
                  <h2 class="mt-2 font-display text-3xl font-bold text-warm-900 sm:text-4xl">
                    Dr. {{ selectedDoctor.name }}
                  </h2>
                </div>
                <div class="rounded-lg bg-accent-50 px-4 py-3 text-right">
                  <div class="text-2xl font-bold text-accent-700">{{ selectedDoctor.rating }}</div>
                  <div class="text-xs font-semibold uppercase tracking-widest text-accent-700/80">Note</div>
                </div>
              </div>

              <div class="mt-6 grid gap-3 sm:grid-cols-2">
                <div class="rounded-lg bg-warm-50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-widest text-warm-400">Experience</p>
                  <p class="mt-1 text-lg font-bold text-warm-900">{{ selectedDoctor.experience }} ans</p>
                </div>
                <div class="rounded-lg bg-warm-50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-widest text-warm-400">Patients suivis</p>
                  <p class="mt-1 text-lg font-bold text-warm-900">{{ selectedDoctor.patients }}</p>
                </div>
                <div class="rounded-lg bg-warm-50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-widest text-warm-400">Disponibilite</p>
                  <p class="mt-1 text-base font-semibold text-warm-800">
                    {{ selectedDoctor.availability.join(', ') }}
                  </p>
                </div>
                <div class="rounded-lg bg-warm-50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-widest text-warm-400">Specialites</p>
                  <p class="mt-1 text-base font-semibold text-warm-800">
                    {{ selectedDoctor.specialties.join(', ') }}
                  </p>
                </div>
              </div>

              <div class="mt-6 grid gap-3 rounded-lg border border-warm-200 bg-white p-4">
                <a
                  v-if="selectedDoctor.email"
                  :href="`mailto:${selectedDoctor.email}`"
                  class="flex items-center gap-3 rounded-lg bg-warm-50 px-4 py-3 text-base font-semibold text-warm-700 transition hover:bg-primary-50 hover:text-primary-700"
                >
                  <i class="fas fa-envelope w-4 text-primary-500"></i>
                  <span class="break-all">{{ selectedDoctor.email }}</span>
                </a>
                <a
                  v-if="selectedDoctor.phone"
                  :href="phoneHref(selectedDoctor.phone)"
                  class="flex items-center gap-3 rounded-lg bg-warm-50 px-4 py-3 text-base font-semibold text-warm-700 transition hover:bg-primary-50 hover:text-primary-700"
                >
                  <i class="fas fa-phone w-4 text-primary-500"></i>
                  <span>{{ selectedDoctor.phone }}</span>
                </a>
              </div>

              <p class="mt-6 text-base leading-relaxed text-warm-600">
                {{ selectedDoctor.bio }}
              </p>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="btn-primary inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold"
                  @click="openAppointment"
                >
                  <i class="fas fa-calendar-check text-xs"></i>
                  Rendez-vous
                </button>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border border-warm-200 bg-white px-5 py-3 text-sm font-semibold text-warm-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
                  @click="closeDoctorDetail"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

import ToastContainer from './shared/components/ToastContainer.vue'

type DoctorDetail = {
  id: number
  name: string
  experience: number
  patients: number
  rating: number
  photo: string
  availability: string[]
  email?: string
  phone?: string
  specialty: string
  specialties: string[]
  bio: string
}

const selectedDoctor = ref<DoctorDetail | null>(null)

function openDoctorDetail(doctor: unknown) {
  selectedDoctor.value = doctor as DoctorDetail
}

function closeDoctorDetail() {
  selectedDoctor.value = null
}

function openAppointment() {
  closeDoctorDetail()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDoctorDetail()
  }
}

window.appModals = {
  openAppointment,
  openLogin: () => undefined,
  openDoctorDetail
}

window.addEventListener('keydown', onKeydown)

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

function phoneHref(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.startsWith('237') ? `tel:+${cleaned}` : `tel:+237${cleaned}`
}
</script>

<style scoped>
.doctor-modal-enter-active,
.doctor-modal-leave-active {
  transition: opacity 0.2s ease;
}

.doctor-modal-enter-from,
.doctor-modal-leave-to {
  opacity: 0;
}
</style>
