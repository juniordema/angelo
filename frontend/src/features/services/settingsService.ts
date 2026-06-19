import api from "@/shared/api/client"
import { API_ROUTES } from "@/shared/api/routes"

export const getSettings = async () => {
    const response = await api.get(API_ROUTES.settings.root)
    return response.data
}
