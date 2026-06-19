import type { Article } from '../services/contentService'

export type LocalizedArticle = Article & {
  displayTitle: string
  displayExcerpt: string
  displayContent: string
  displayCategory: string
  displayTags: string[]
}

function localizedValue(primary: string | undefined, fallback: string | undefined) {
  return primary?.trim() || fallback?.trim() || ''
}

export function getLocalizedArticle(article: Article, locale: string): LocalizedArticle {
  const isEnglish = locale === 'en'

  return {
    ...article,
    displayTitle: isEnglish ? localizedValue(article.titleEn, article.title) : article.title,
    displayExcerpt: isEnglish ? localizedValue(article.excerptEn, article.excerpt) : article.excerpt || '',
    displayContent: isEnglish ? localizedValue(article.contentEn, article.content) : article.content,
    displayCategory: isEnglish ? localizedValue(article.categoryEn, article.category) : article.category || '',
    displayTags: isEnglish && article.tagsEn?.length ? article.tagsEn : article.tags || []
  }
}
