import { doctorImages } from '@/features/data/imageAssets'
import { roomImages } from '@/features/data/roomImages'
import { apiClient } from '@/shared/api/client'
import { API_ROUTES } from '@/shared/api/routes'

export type ContentLocale = 'fr' | 'en'

export type LocalizedCopy = {
  specialty: string
  specialties: string[]
  bio: string
}

export type HomeDoctor = {
  id: number
  name: string
  experience: number
  patients: number
  rating: number
  photoKey: keyof typeof doctorImages
  photo?: string
  availability: string[]
  email?: string
  phone?: string
  locales: Record<ContentLocale, LocalizedCopy>
}

export type DoctorDisplay = HomeDoctor &
    LocalizedCopy & {
  photo: string
}

export type HomeService = {
  name: string
  nameEn?: string
  icon: string
  imageKey?: string
  image?: string
  desc: string
  descEn?: string
  fullDescription?: string
  fullDescriptionEn?: string
  schedule?: string[]
  benefits?: string[]
  color: string
  bgClass: string
}

export type ServiceDisplay = HomeService & {
  image: string
}

export type HomeImageryService = {
  id: number
  name: string
  nameEn?: string
  icon: string
  imageKey: string
  image?: string
  roomName: string
  roomNameEn: string
  roomDescription: string
  roomDescriptionEn: string
  imageAlt: string
  imageAltEn: string
  description: string
  descriptionEn: string
  equipment: string
  equipmentEn: string
  benefits: string[]
  benefitsEn: string[]
}

export type ImageryDisplay = Omit<HomeImageryService, 'image'> & {
  image: string
  displayName: string
  displayDescription: string
  displayEquipment: string
  displayBenefits: string[]
  displayRoomName: string
  displayRoomDescription: string
  displayImageAlt: string
}

export type HomeTestimonial = {
  id: number
  name: string
  nameEn?: string
  info: string
  infoEn?: string
  text: string
  textEn?: string
  photoSeed: string
}

export type HomeStat = {
  value: string
  label: string
  labelEn?: string
  icon: string
  color: string
  bgClass: string
}

export type HomeContentResponse = {
  services: HomeService[]
  doctors: HomeDoctor[]
  imageryServices: HomeImageryService[]
  testimonials: HomeTestimonial[]
  stats: HomeStat[]
}

export type HomeContentDisplay = Omit<HomeContentResponse, 'services' | 'doctors' | 'imageryServices'> & {
  services: ServiceDisplay[]
  doctors: DoctorDisplay[]
  imageryServices: ImageryDisplay[]
}

function getDoctorImage(photoKey: keyof typeof doctorImages) {
  return doctorImages[photoKey]
}

function getServiceDoctorImage(index: number) {
  const images = Object.values(doctorImages)
  return images[index % images.length]
}

function normalizeImageKey(imageKey: string) {
  const normalized = imageKey
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')

  if (normalized in roomImages) {
    return normalized
  }

  const aliases: Record<string, string> = {
    soins: 'soin',
    'bloc-operatoire': 'bloc',
    'block-operatoire': 'bloc',
    'block operatoire': 'bloc',
    blocoperatoire: 'bloc'
  }

  return aliases[normalized] || normalized
}

function getRoomImage(imageKey?: string) {
  if (!imageKey) return roomImages.consultation

  const resolvedKey = normalizeImageKey(imageKey)
  return roomImages[resolvedKey] || roomImages.consultation
}

export async function fetchHomeContent(): Promise<HomeContentDisplay> {
  const { data } = await apiClient.get<HomeContentResponse>(API_ROUTES.content.home)

  return {
    ...data,

    services: data.services.map((service, index) => ({
      ...service,
      image: getServiceDoctorImage(index)
    })) as ServiceDisplay[],

    doctors: data.doctors.map((doctor) => ({
      ...doctor,
      photo: getDoctorImage(doctor.photoKey)
    })) as DoctorDisplay[],

    imageryServices: data.imageryServices.map((service) => ({
      ...service,
      image: getRoomImage(service.imageKey)
    })) as ImageryDisplay[]
  }
}
