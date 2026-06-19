import type { AxiosError } from "axios"

import apiClient, { getStoredToken } from "@/shared/api/client"
import { API_ROUTES } from "@/shared/api/routes"

export type ArticleStatus = "draft" | "published" | "scheduled" | "archived"

export async function translateArticle(payload: Partial<Article>): Promise<Partial<Article>> {
    const { data } = await apiClient.post("/content/articles/translate", payload)
    return data
}

export type Article = {
    _id: string

    title: string
    titleEn?: string

    slug: string

    excerpt?: string
    excerptEn?: string

    content: string
    contentEn?: string

    coverImage?: string

    category?: string
    categoryEn?: string

    tags: string[]
    tagsEn?: string[]

    author: string
    status: ArticleStatus
    views: number
    shares: {
        whatsapp: number
        facebook: number
        linkedin: number
        twitter: number
        copyLink: number
    }
    publishedAt?: string
    scheduledAt?: string
    createdAt: string
    updatedAt: string
}

export type ContentStats = {
    totalArticles: number
    publishedArticles: number
    draftArticles: number
    scheduledArticles: number
    totalViews: number
    totalShares: number
    topViewedArticle?: Article
    topSharedArticle?: Article
}

export type ShareUrlResponse = {
    success: boolean
    shareUrl: string
    articleUrl: string
    message?: string
}

export type FacebookPublishResponse = {
    success: boolean
    message: string
    facebookPostId?: string
    articleUrl?: string
}

function debugContent(message: string, payload?: unknown) {
    if (import.meta.env.DEV) {
        console.log(`[ContentService] ${message}`, payload ?? "")
    }
}

function isNotFoundError(error: unknown) {
    return (error as AxiosError).response?.status === 404
}

function getPublicSiteUrl() {
    return (import.meta.env.VITE_PUBLIC_SITE_URL || window.location.origin).replace(/\/$/, "")
}

export function getPublicArticleUrl(article: Article) {
    if (!article.slug) {
        throw new Error("Article slug is missing.")
    }

    return `${getPublicSiteUrl()}/articles/${article.slug}`
}

export function getFacebookShareUrl(articleUrl: string) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
}

export function openArticleFacebookShare(article: Article) {
    const articleUrl = getPublicArticleUrl(article)
    const shareUrl = getFacebookShareUrl(articleUrl)

    debugContent("open Facebook share dialog", {
        articleId: article._id,
        articleUrl,
        shareUrl
    })

    window.open(
        shareUrl,
        "_blank",
        "noopener,noreferrer,width=700,height=600"
    )
}

export async function fetchContentStats() {
    debugContent("GET content stats", API_ROUTES.content.stats)
    const { data } = await apiClient.get<ContentStats>(API_ROUTES.content.stats)
    debugContent("content stats loaded", data)
    return data
}

export async function fetchArticles() {
    debugContent("GET admin articles", API_ROUTES.content.articles)
    const { data } = await apiClient.get<Article[]>(API_ROUTES.content.articles)
    debugContent("admin articles loaded", { count: data.length })
    return data
}

export async function createArticle(payload: Partial<Article>) {
    debugContent("POST article", payload)
    const { data } = await apiClient.post(API_ROUTES.content.articles, payload)
    debugContent("article created", data)
    return data
}

export async function updateArticle(id: string, payload: Partial<Article>) {
    debugContent("PUT article", { id, payload })
    const { data } = await apiClient.put(API_ROUTES.content.article(id), payload)
    debugContent("article updated", data)
    return data
}

export async function deleteArticle(id: string) {
    debugContent("DELETE article", id)
    const { data } = await apiClient.delete(API_ROUTES.content.article(id))
    debugContent("article deleted", data)
    return data
}

export async function publishArticle(id: string) {
    debugContent("PATCH publish article", id)
    const { data } = await apiClient.patch(API_ROUTES.content.publishArticle(id))
    debugContent("article published", data)
    return data
}

export async function unpublishArticle(id: string) {
    debugContent("PATCH unpublish article", id)
    const { data } = await apiClient.patch(API_ROUTES.content.unpublishArticle(id))
    debugContent("article unpublished", data)
    return data
}

export async function getArticleFacebookShareUrl(id: string) {
    debugContent("GET article Facebook share URL", id)

    const route = API_ROUTES.content.articleFacebookShareUrl?.(id)

    if (!route) {
        throw new Error("Facebook share URL route is not configured.")
    }

    const { data } = await apiClient.get<ShareUrlResponse>(route)
    debugContent("article Facebook share URL loaded", data)
    return data
}

export async function publishArticleToFacebook(id: string) {
    debugContent("POST publish article to Facebook", id)

    const route = API_ROUTES.content.publishArticleFacebook?.(id)

    if (!route) {
        throw new Error("Facebook publish route is not configured.")
    }

    const { data } = await apiClient.post<FacebookPublishResponse>(route)
    debugContent("article Facebook publish response", data)
    return data
}

export async function fetchPublishedArticles() {
    try {
        debugContent("GET public articles", API_ROUTES.content.publicArticles)
        const { data } = await apiClient.get<Article[]>(API_ROUTES.content.publicArticles)
        debugContent("public articles loaded", { count: data.length })
        return data
    } catch (error) {
        if (!isNotFoundError(error)) throw error

        debugContent("public articles endpoint missing, falling back to admin articles")
        if (!getStoredToken()) return []

        const articles = await fetchArticles()
        return articles.filter((article) => article.status === "published")
    }
}

export async function fetchPublishedArticleBySlug(slug: string) {
    try {
        debugContent("GET public article by slug", slug)
        const { data } = await apiClient.get<Article>(API_ROUTES.content.publicArticleBySlug(slug))
        debugContent("public article loaded", data)
        return data
    } catch (error) {
        if (!isNotFoundError(error)) throw error

        debugContent("public article endpoint missing, falling back to admin articles", slug)
        if (!getStoredToken()) throw error

        const articles = await fetchArticles()
        const article = articles.find((item) => item.slug === slug && item.status === "published")

        if (!article) throw error

        return article
    }
}

export async function incrementArticleView(id: string) {
    try {
        debugContent("POST article view", id)
        const { data } = await apiClient.post(API_ROUTES.content.publicArticleView(id))
        debugContent("article view tracked", data)
        return data
    } catch (error) {
        if (!isNotFoundError(error)) throw error
        debugContent("article view endpoint missing, continuing without tracking", id)
        return null
    }
}

export async function trackArticleShare(id: string, platform: keyof Article["shares"]) {
    try {
        debugContent("POST article share", { id, platform })
        const { data } = await apiClient.post(API_ROUTES.content.publicArticleShare(id), {
            platform
        })
        debugContent("article share tracked", data)
        return data
    } catch (error) {
        if (!isNotFoundError(error)) throw error
        debugContent("article share endpoint missing, continuing without tracking", { id, platform })
        return null
    }
}

export async function createArticleWithImage(payload: FormData) {
    const { data } = await apiClient.post("/content/articles", payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return data
}

export async function updateArticleWithImage(id: string, payload: FormData) {
    const { data } = await apiClient.put(`/content/articles/${id}`, payload, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return data
}