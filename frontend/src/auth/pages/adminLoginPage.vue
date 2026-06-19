<template>
  <main class="min-h-screen bg-warm-50 px-4 py-16">
    <section class="mx-auto max-w-md rounded-lg bg-white p-6 shadow-xl shadow-warm-900/10">
      <router-link to="/" class="inline-flex items-center gap-2 text-sm font-semibold text-primary-700">
        <i class="fas fa-arrow-left text-xs"></i>
        Retour au site
      </router-link>

      <h1 class="font-display mt-6 text-3xl font-bold text-warm-900">Connexion admin</h1>
      <p class="mt-2 text-sm text-warm-500">Accedez au tableau de bord marketing.</p>

      <form class="mt-6 space-y-4" @submit.prevent= " handleLogin">
        <label class="block">
          <span class="text-sm font-semibold text-warm-700">Email</span>
          <input
            v-model="email"
            type="email"
            required
            class="mt-2 w-full rounded-lg border border-warm-200 px-3 py-2 outline-none focus:border-primary-500"
            autocomplete="email"
          />
        </label>

        <label class="block">
          <span class="text-sm font-semibold text-warm-700">Mot de passe</span>
          <input
            v-model="password"
            type="password"
            required
            class="mt-2 w-full rounded-lg border border-warm-200 px-3 py-2 outline-none focus:border-primary-500"
            autocomplete="current-password"
          />
        </label>

        <p v-if="errorMessage" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          @click="handleLogin"
          class="btn-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
          :disabled="loading"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin text-xs"></i>
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '../stores/authStore'
import { getApiErrorMessage } from '../../shared/api/client'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  console.log('Bouton connexion cliqué')

  loading.value = true
  errorMessage.value = ''

  try {
    const user = await authStore.login({
      email: email.value,
      password: password.value
    })

    if (user.role !== 'admin') {
      authStore.logout()
      errorMessage.value = 'Accès refusé : admin uniquement.'
      return
    }

    router.push('/admin')
  } catch (error) {
    errorMessage.value = getApiErrorMessage(error, 'Connexion impossible.')
  } finally {
    loading.value = false
  }
}
</script>