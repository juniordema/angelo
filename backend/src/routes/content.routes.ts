import express from "express"

import {
    getHomeContent,
    getContentStats,
    getArticles,
    getPublishedArticles,
    getPublishedArticleBySlug,
    incrementArticleView,
    trackArticleShare,
    createArticle,
    updateArticle,
    deleteArticle,
    publishArticle,
    unpublishArticle
} from "../controllers/content.controller"

import { protect } from "../middlewares/auth.middleware"
import { requireAdmin } from "../middlewares/role.middleware"
import { upload } from "../middlewares/upload.middleware"
const router = express.Router()
import { translateArticle } from "../controllers/content.controller"
router.get("/home", getHomeContent)
router.get("/public/articles", getPublishedArticles)
router.get("/public/articles/:slug", getPublishedArticleBySlug)
router.post("/public/articles/:id/view", incrementArticleView)
router.post("/public/articles/:id/share", trackArticleShare)
router.post("/articles/translate", translateArticle)
router.get("/stats", protect, requireAdmin, getContentStats)
router.get("/articles", protect, requireAdmin, getArticles)
router.post("/articles", protect, requireAdmin, upload.single("image"), createArticle)
router.put("/articles/:id", protect, requireAdmin, upload.single("image"), updateArticle)
router.delete("/articles/:id", protect, requireAdmin, deleteArticle)
router.patch("/articles/:id/publish", protect, requireAdmin, publishArticle)
router.patch("/articles/:id/unpublish", protect, requireAdmin, unpublishArticle)

export default router
