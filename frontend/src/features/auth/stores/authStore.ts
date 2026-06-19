import { defineStore } from "pinia"
import api from "@/shared/api/client"
import { API_ROUTES } from "@/shared/api/routes"

interface User {
    id: string
    name: string
    email: string
    role: "admin" | "user"
}

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || "",
        user: JSON.parse(localStorage.getItem("user") || "null") as User | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === "admin"
    },

    actions: {
        async login(email: string, password: string) {
            const response = await api.post(API_ROUTES.auth.login, {
                email,
                password
            })

            this.token = response.data.token
            this.user = response.data.user

            localStorage.setItem("token", this.token)
            localStorage.setItem("user", JSON.stringify(this.user))

            return response.data
        },

        logout() {
            this.token = ""
            this.user = null

            localStorage.removeItem("token")
            localStorage.removeItem("user")
        }
    }
})
