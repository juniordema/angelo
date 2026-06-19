import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"

import AdminLoginPage from "../../auth/pages/adminLoginPage.vue"
import HomePage from "../../features/public-site/pages/HomePage.vue"
import AdminLayout from "../../layouts/admin/adminLayout.vue"
import PublicLayout from "../../layouts/public/publicLayout.vue"

import CampaignsPage from "../../marketing/pages/CampaignsPage.vue"
import LeadsPage from "../../marketing/pages/LeadsPage.vue"
import MarketingDashboardPage from "../../marketing/pages/MarketingDashboardPage.vue"

import { useAuthStore } from "../../auth/stores/authStore"

function debugRouter(message: string, payload?: unknown) {
  if (import.meta.env.DEV) {
    console.log(`[Router] ${message}`, payload ?? "")
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: PublicLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomePage
      },
      {
        path: "articles",
        name: "public-articles",
        component: () => import("../../features/public-site/pages/ArticlesPage.vue")
      },
      {
        path: "articles/:slug",
        name: "public-article-detail",
        component: () => import("../../features/public-site/pages/ArticleDetailPage.vue")
      }
    ]
  },

  {
    path: "/admin/login",
    name: "admin-login",
    component: AdminLoginPage
  },

  {
    path: "/dashboard",
    redirect: "/admin"
  },

  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
    children: [
      {
        path: "",
        name: "marketing-dashboard",
        component: MarketingDashboardPage
      },
      {
        path: "campaigns",
        name: "campaigns",
        component: CampaignsPage
      },
      {
        path: "leads",
        name: "leads",
        component: LeadsPage
      },
      {
        path: "content",
        name: "content-dashboard",
        component: () => import("../../features/content/pages/ContentDashboardPage.vue")
      },
      {
        path: "content/articles",
        name: "content-articles",
        component: () => import("../../features/content/pages/ArticlesPage.vue")
      },
      {
        path: "content/articles/new",
        name: "content-article-new",
        component: () => import("../../features/content/pages/ArticleEditorPage.vue")
      },
      {
        path: "content/articles/:id/edit",
        name: "content-article-edit",
        component: () => import("../../features/content/pages/ArticleEditorPage.vue")
      }
    ]
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: "smooth" }
    }

    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.initializeAuth()

  debugRouter("beforeEach", {
    from: from.fullPath,
    to: to.fullPath,
    matched: to.matched.map((record) => record.path),
    requiresAuth: Boolean(to.meta.requiresAuth),
    requiresAdmin: Boolean(to.meta.requiresAdmin),
    isAuthenticated: authStore.isAuthenticated,
    isAdmin: authStore.isAdmin
  })

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    debugRouter("blocked: auth required", to.fullPath)
    return next("/admin/login")
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    debugRouter("blocked: admin required", to.fullPath)
    return next("/admin/login")
  }

  if (to.path === "/admin/login" && authStore.isAuthenticated && authStore.isAdmin) {
    debugRouter("redirect authenticated admin to /admin")
    return next("/admin")
  }

  next()
})

router.afterEach((to) => {
  debugRouter("afterEach", {
    path: to.fullPath,
    name: to.name
  })
})

export default router
