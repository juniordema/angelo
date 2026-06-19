import apiClient from '../../shared/api/client'
import { API_ROUTES } from '../../shared/api/routes'

export type MarketingStats = {
  totalCampaigns: number
  activeCampaigns: number
  totalLeads: number
  convertedLeads: number
  conversionRate: number
}

export type Lead = {
  _id: string
  name: string
  phone?: string
  email: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  score?: number
  createdAt: string
  updatedAt?: string
}

export type Campaign = {
  _id: string
  name: string
  description?: string
  channel: 'email' | 'social' | 'seo' | 'ads' | 'referral' | string
  budget: number
  objective?: string
  startDate?: string
  endDate?: string
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused'
  createdAt?: string
  updatedAt?: string
}

export const fallbackLeads: Lead[] = []

export async function fetchMarketingStats() {
  const { data } = await apiClient.get<MarketingStats>(API_ROUTES.marketing.stats)
  return data
}

export async function fetchLeads() {
  const { data } = await apiClient.get<Lead[]>(API_ROUTES.marketing.leads)
  return data
}

export async function fetchCampaigns() {
  const { data } = await apiClient.get<Campaign[]>(API_ROUTES.marketing.campaigns)
  return data
}

export async function createCampaign(payload: Partial<Campaign>) {
  const { data } = await apiClient.post(API_ROUTES.marketing.campaigns, payload)
  return data
}

export async function updateCampaign(id: string, payload: Partial<Campaign>) {
  const { data } = await apiClient.put(API_ROUTES.marketing.campaign(id), payload)
  return data
}

export async function deleteCampaign(id: string) {
  const { data } = await apiClient.delete(API_ROUTES.marketing.campaign(id))
  return data
}
