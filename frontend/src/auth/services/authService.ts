import apiClient from '../../shared/api/client'
import { API_ROUTES } from '../../shared/api/routes'
import type { LoginCredentials } from '../stores/authStore'

export function login(credentials: LoginCredentials) {
  return apiClient.post(API_ROUTES.auth.login, credentials)
}

export function getCurrentUser() {
  return apiClient.get(API_ROUTES.auth.me)
}
