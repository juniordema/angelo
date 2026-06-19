import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import apiClient, {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  saveAuthStorage
} from '../../shared/api/client'
import { API_ROUTES } from '../../shared/api/routes'

export type AuthUser = {
  id?: string
  name?: string
  firstName?: string
  lastName?: string
  email?: string
  role?: 'admin' | 'user' | string
}

export type LoginCredentials = {
  email: string
  password: string
}

type LoginResponse = {
  token?: string
  accessToken?: string
  user?: AuthUser
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getStoredToken())
  const user = ref<AuthUser | null>(getStoredUser<AuthUser>())

  const isAuthenticated = computed(() => Boolean(token.value && user.value))
  const isAdmin = computed(() => user.value?.role === 'admin')

  function initializeAuth() {
    token.value = getStoredToken()
    user.value = getStoredUser<AuthUser>()
  }

  async function login(credentials: LoginCredentials) {
    const { data } = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, credentials)

    const nextToken = data.token || data.accessToken
    const nextUser = data.user

    if (!nextToken || !nextUser) {
      throw new Error('Réponse de connexion invalide.')
    }

    token.value = nextToken
    user.value = nextUser

    saveAuthStorage(nextToken, nextUser)

    return nextUser
  }

  function logout() {
    token.value = null
    user.value = null
    clearAuthStorage()
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    login,
    logout
  }
})
