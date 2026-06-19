import axios from 'axios'
import type { AxiosError } from 'axios'

import { API_ROUTES } from './routes'

export const AUTH_TOKEN_KEY = 'auth_token'
export const AUTH_USER_KEY = 'user'

const LEGACY_TOKEN_KEY = 'angelo_token'
const LEGACY_USER_KEY = 'angelo_user'
const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL || 'http://localhost:5000/api')
type ApiErrorData = {
  error?: string | { message?: string }
  message?: string
}

function normalizeApiBaseUrl(url: string) {
  return String(url).replace(/\/+$/, '') || '/api'
}

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY) || localStorage.getItem(LEGACY_TOKEN_KEY)
}

export function getStoredUser<T = unknown>(): T | null {
  const storedUser = localStorage.getItem(AUTH_USER_KEY) || localStorage.getItem(LEGACY_USER_KEY)
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as T
  } catch {
    clearAuthStorage()
    return null
  }
}

export function saveAuthStorage(token: string, user: unknown) {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
  localStorage.removeItem(LEGACY_TOKEN_KEY)
  localStorage.removeItem(LEGACY_USER_KEY)
}

export function clearAuthStorage() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
  localStorage.removeItem(LEGACY_TOKEN_KEY)
  localStorage.removeItem(LEGACY_USER_KEY)
}

export function getApiErrorMessage(error: unknown, fallback = 'Une erreur est survenue.') {
  const axiosError = error as AxiosError<ApiErrorData>
  const data = axiosError.response?.data
  const apiError = data?.error

  if (typeof apiError === 'string') return apiError
  if (typeof apiError?.message === 'string') return apiError.message
  if (typeof data?.message === 'string') return data.message
  if (error instanceof Error && error.message) return error.message

  return fallback
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: unknown) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const requestUrl = error.config?.url || ''
    const isAuthRequest = requestUrl.includes(API_ROUTES.auth.login)
    const hasStoredToken = !!getStoredToken()

    if (error.response?.status === 401 && hasStoredToken && !isAuthRequest) {
      clearAuthStorage()
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export default apiClient
