import React from 'react'
import { useLanguage } from './LanguageContext'
import './LanguageSelector.scss'

// Language buttons: English / മലയാളം / ಕನ್ನಡ / தமிழ்
// Drop <LanguageSelector /> into any page (or the header) to let visitors switch.
const LanguageSelector = ({ className = '', light = false }) => {
  const { lang, setLang, languages, t } = useLanguage()

  return (
    <div className={`language-selector ${light ? 'light' : ''} ${className}`} role='group' aria-label={t('language')}>
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
        <circle cx='12' cy='12' r='9' />
        <path d='M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z' />
      </svg>
      {languages.map((language) => (
        <button
          key={language.code}
          type='button'
          lang={language.code}
          className={lang === language.code ? 'active' : ''}
          aria-pressed={lang === language.code}
          onClick={() => setLang(language.code)}>
          {language.label}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector
