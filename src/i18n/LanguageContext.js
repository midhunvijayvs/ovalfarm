import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, DEFAULT_LANGUAGE, TRANSLATIONS } from './translations'

// Site-wide language setting.
// Wrap the app in <LanguageProvider>, then in any component:
//   const { lang, setLang, t, tr } = useLanguage()
//   t('ingredients')    -> a fixed label from translations.js
//   tr(recipe.name)     -> picks the current language from a { en, ml, kn, ta } text
// The chosen language is remembered in the browser for the next visit.

const STORAGE_KEY = 'oval-language'

const LanguageContext = createContext(null)

const readSavedLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGUAGES.some((l) => l.code === saved)) return saved
  } catch (e) { }
  return DEFAULT_LANGUAGE
}

// Picks the right language from a text that is either a plain string or { en, ml, kn, ta }
export const pickText = (value, lang) => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  return value[lang] || value[DEFAULT_LANGUAGE] || ''
}

// True when a { en, ml, ... } text has its own entry for this language
export const hasText = (value, lang) =>
  lang === DEFAULT_LANGUAGE || (value && typeof value === 'object' && Boolean(value[lang]))

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readSavedLanguage)

  const setLang = useCallback((code) => {
    setLangState(code)
    try { localStorage.setItem(STORAGE_KEY, code) } catch (e) { }
  }, [])

  // Lets the browser (and the CSS) know which language the page is in
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const t = (key, vars) => {
      let text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS[DEFAULT_LANGUAGE][key] ?? key
      if (vars) Object.keys(vars).forEach((name) => { text = text.replace(`{${name}}`, vars[name]) })
      return text
    }
    const unit = (code) => TRANSLATIONS[lang]?.units?.[code] ?? TRANSLATIONS[DEFAULT_LANGUAGE].units[code] ?? code
    const tr = (text) => pickText(text, lang)
    const languageName = LANGUAGES.find((l) => l.code === lang)?.label
    return { lang, setLang, t, tr, unit, languageName, languages: LANGUAGES }
  }, [lang, setLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside <LanguageProvider>')
  return context
}
