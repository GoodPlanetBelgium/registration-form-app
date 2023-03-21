import { useRouter } from 'next/router'
import translations from './translationsLib'

type TranslationType = (
  id: string,
  params?: { [key: string]: string }
) => string

const useTranslations = (category: string) => {
  const { locale } = useRouter()
  return (id: string, params?: { [param: string]: string }) => {
    if (!locale || !category || !id) {
      throw new Error(
        'Translations: Make sure locale, category and id are defined.'
      )
    }
    let result = translations[locale][category][id]
    if (params) {
      translations[locale][category][id].split(/[{}]/).forEach(key => {
        if (params[key]) {
          result = result.replace(`{${key}}`, params[key])
        }
      })
    }
    if (!result) {
      throw new Error(
        `Translations: Not found, ID: ${locale}.${category}.${id} `
      )
    }
    return result
  }
}

const useTranslationsCategory = (category: string) => {
  const { locale } = useRouter()
  if (!locale || !category) {
    throw new Error('Translations: Make sure locale and category are defined.')
  }
  return translations[locale][category]
}

export default useTranslations
export { useTranslationsCategory }
export type { TranslationType }
