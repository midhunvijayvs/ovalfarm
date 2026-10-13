import React, { useMemo, useState } from 'react'
import './Recipes.scss'
import { useLanguage, pickText } from '../../../i18n/LanguageContext'
import LanguageSelector from '../../../i18n/LanguageSelector'
import RecipeCard from './RecipeCard'
import { useRecipes } from './recipeHelpers'

const IMAGES = process.env.REACT_APP_PUBLIC_IMAGES_URL

// /recipies/list
const RecipeList = () => {
  const { t, lang } = useLanguage()
  const { recipes, isLoading } = useRecipes()
  const [search, setSearch] = useState('')

  // Search matches the recipe name or an ingredient, in the chosen language or English
  const visibleRecipes = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return recipes
    const matches = (text) =>
      pickText(text, lang).toLowerCase().includes(query) || pickText(text, 'en').toLowerCase().includes(query)
    return recipes.filter((recipe) =>
      matches(recipe.name) || (recipe.ingredients || []).some((item) => matches(item.name)))
  }, [recipes, search, lang])

  return (
    <div className='recipes-page'>
      <section className='recipes-hero' style={{ backgroundImage: `url(${IMAGES}/home/hero-1100.jpg)` }}>
        <div className='recipes-hero-inner'>
          <span className='eyebrow light'>{t('recipes_eyebrow')}</span>
          <h1>{t('recipes_title')}</h1>
          <p>{t('recipes_subtitle')}</p>
          <LanguageSelector light />
        </div>
      </section>

      <section className='recipes-list'>
        <div className='recipes-toolbar'>
          <label className='recipes-search'>
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
              <circle cx='11' cy='11' r='7' /><path d='m20 20-3.5-3.5' />
            </svg>
            <input
              type='search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_recipes')}
              aria-label={t('search_recipes')}
            />
          </label>
        </div>

        {isLoading ? (
          <p className='recipes-message'>{t('loading')}</p>
        ) : visibleRecipes.length === 0 ? (
          <p className='recipes-message'>{t('no_results')}</p>
        ) : (
          <div className='recipe-grid'>
            {visibleRecipes.map((recipe, index) => (
              <RecipeCard recipe={recipe} number={index + 1} key={recipe.id} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default RecipeList
