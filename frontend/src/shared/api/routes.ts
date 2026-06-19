export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    me: '/auth/me'
  },

  content: {
    home: '/content/home',
    stats: '/content/stats',

    articles: '/content/articles',
    article: (id: string) => `/content/articles/${encodeURIComponent(id)}`,

    publishArticle: (id: string) =>
        `/content/articles/${encodeURIComponent(id)}/publish`,

    unpublishArticle: (id: string) =>
        `/content/articles/${encodeURIComponent(id)}/unpublish`,

    articleFacebookShareUrl: (id: string) =>
        `/content/articles/${encodeURIComponent(id)}/facebook-share-url`,

    publishArticleFacebook: (id: string) =>
        `/content/articles/${encodeURIComponent(id)}/publish-facebook`,

    publicArticles: '/content/public/articles',

    publicArticleBySlug: (slug: string) =>
        `/content/public/articles/${encodeURIComponent(slug)}`,

    publicArticleView: (id: string) =>
        `/content/public/articles/${encodeURIComponent(id)}/view`,

    publicArticleShare: (id: string) =>
        `/content/public/articles/${encodeURIComponent(id)}/share`
  },

  marketing: {
    stats: '/admin/marketing/stats',
    leads: '/admin/marketing/leads',
    campaigns: '/admin/marketing/campaigns',
    campaign: (id: string) =>
        `/admin/marketing/campaigns/${encodeURIComponent(id)}`
  },

  settings: {
    root: '/settings'
  }
} as const