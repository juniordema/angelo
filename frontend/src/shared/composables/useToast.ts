import { reactive } from 'vue'

type ToastType = 'success' | 'error' | 'warning' | 'info'

type Toast = {
  id: number
  message: string
  type: ToastType
  leaving: boolean
}

const toasts = reactive<Toast[]>([])
let toastId = 0

export function useToast() {
  function addToast(message: string, type: ToastType = 'info') {
    const id = ++toastId
    toasts.push({ id, message, type, leaving: false })
    setTimeout(() => {
      const toast = toasts.find((item) => item.id === id)
      if (toast) toast.leaving = true
      setTimeout(() => {
        const idx = toasts.findIndex((item) => item.id === id)
        if (idx !== -1) toasts.splice(idx, 1)
      }, 400)
    }, 3500)
  }

  return { toasts, addToast }
}
