type FacebookArticlePayload = {
    title: string
    excerpt?: string
    slug: string
}

function getPublicSiteUrl() {
    return (process.env.PUBLIC_SITE_URL || "").replace(/\/$/, "")
}

export function buildPublicArticleUrl(slug: string) {
    const publicSiteUrl = getPublicSiteUrl()

    if (!publicSiteUrl) {
        throw new Error("PUBLIC_SITE_URL is not configured")
    }

    return `${publicSiteUrl}/articles/${encodeURIComponent(slug)}`
}

export function buildFacebookShareUrl(articleUrl: string) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`
}

export async function publishArticleLinkToFacebook(article: FacebookArticlePayload) {
    const pageId = process.env.FACEBOOK_PAGE_ID
    const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN

    if (!pageId || !pageAccessToken) {
        return {
            success: false,
            configured: false,
            message: "Facebook publishing is not configured yet."
        }
    }

    const articleUrl = buildPublicArticleUrl(article.slug)

    const message = [
        article.title,
        article.excerpt || "",
        `Lire l’article complet : ${articleUrl}`
    ]
        .filter(Boolean)
        .join("\n\n")

    const response = await fetch(`https://graph.facebook.com/v20.0/${pageId}/feed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${pageAccessToken}`
        },
        body: JSON.stringify({
            message,
            link: articleUrl
        })
    })

    const data = await response.json()

    if (!response.ok) {
        return {
            success: false,
            configured: true,
            message: data?.error?.message || "Facebook publishing failed.",
            error: data
        }
    }

    return {
        success: true,
        configured: true,
        message: "Article link published on Facebook.",
        facebookPostId: data.id,
        articleUrl
    }
}