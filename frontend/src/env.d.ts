/// <reference types="vite/client" />

type AppModalApi = {
  openAppointment?: () => void
  openLogin?: () => void
  openDoctorDetail?: (doctor: unknown) => void
}

declare global {
  interface Window {
    appModals?: AppModalApi
  }
}

export {}
