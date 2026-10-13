import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Recipes.scss'
import { useLanguage, hasText } from '../../../i18n/LanguageContext'
import LanguageSelector from '../../../i18n/LanguageSelector'
import { SITE_INFO } from '../../../siteInfo'
import RecipeCard from './RecipeCard'
import { useRecipe, useRecipes, formatQuantity, splitSteps } from './recipeHelpers'

const BackLink = () => {
  const { t } = useLanguage()
  return (
    <Link to='/recipies/list' className='recipe-back'>
      <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M19 12H5M11 6l-6 6 6 6' />
      </svg>
      {t('back_to_recipes')}
    </Link>
  )
}

// /recipies/details/:id
const RecipeDetails = () => {
  const { id } = useParams()
  const { t, tr, unit, lang, languageName } = useLanguage()
  const { recipe, isLoading } = useRecipe(id)
  const { recipes } = useRecipes()

  if (isLoading) {
    return <div className='recipes-page'><p className='recipes-message padded'>{t('loading')}</p></div>
  }

  if (!recipe) {
    return (
      <div className='recipes-page'>
        <div className='recipe-missing'>
          <p className='recipes-message'>{t('recipe_not_found')}</p>
          <BackLink />
        </div>
      </div>
    )
  }

  const steps = splitSteps(tr(recipe.cooking_instruction))
  const isFullyTranslated = hasText(recipe.name, lang) && hasText(recipe.cooking_instruction, lang)
  const otherRecipes = recipes.filter((item) => String(item.id) !== String(recipe.id)).slice(0, 3)

  return (
    <div className='recipes-page'>
      <section className='recipe-hero' style={{ backgroundImage: `url(${recipe.bg_image || recipe.image})` }}>
        <div className='recipe-hero-inner'>
          <div className='recipe-hero-text'>
            <BackLink />
            <h1>{tr(recipe.name)}</h1>
            <div className='recipe-facts'>
              {recipe.cooking_time ? (
                <span>
                  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                    <circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' />
                  </svg>
                  {t('cooking_time')}: <strong>{recipe.cooking_time} {t('minutes')}</strong>
                </span>
              ) : null}
              <span>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
                  <path d='M4 7h16M4 12h16M4 17h10' />
                </svg>
                <strong>{t('ingredients_count', { n: recipe.ingredients.length })}</strong>
              </span>
            </div>
            <LanguageSelector light />
          </div>
          <div className='recipe-hero-image'>
            <img src={recipe.image} alt={tr(recipe.name)} />
          </div>
        </div>
      </section>

      {!isFullyTranslated && (
        <div className='recipe-notice'><span>{t('not_translated', { lang: languageName })}</span></div>
      )}

      <section className='recipe-body'>
        <aside className='recipe-side'>
          <div className='recipe-panel'>
            <h2>{t('ingredients')}</h2>
            <ul className='ingredient-list'>
              {recipe.ingredients.map((item, index) => {
                const quantity = formatQuantity(item.quantity)
                const unitName = unit(item.unit)
                return (
                  <li key={index}>
                    <span className='ingredient-name'>{tr(item.name)}</span>
                    <span className='ingredient-qty'>{[quantity, unitName].filter(Boolean).join(' ')}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {recipe.utensils_needed && recipe.utensils_needed.length > 0 && (
            <div className='recipe-panel'>
              <h2>{t('utensils')}</h2>
              <ul className='utensil-list'>
                {recipe.utensils_needed.map((utensil, index) => (
                  <li key={index}>{tr(utensil)}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div className='recipe-main'>
          <h2>{t('instructions')}</h2>
          <ol className='step-list'>
            {steps.map((step, index) => (
              <li key={index}>
                <span className='step-number'>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>

          <div className='recipe-order'>
            <div>
              <h3>{t('order_cta_title')}</h3>
              <p>{t('order_cta_text')}</p>
            </div>
            <a href={SITE_INFO.whatsappLink} target='_blank' rel='noreferrer'>{t('order_cta_button')}</a>
          </div>
        </div>
      </section>

      {otherRecipes.length > 0 && (
        <section className='recipes-more'>
          <h2>{t('more_recipes')}</h2>
          <div className='recipe-grid'>
            {otherRecipes.map((item) => <RecipeCard recipe={item} key={item.id} />)}
          </div>
        </section>
      )}
    </div>
  )
}

export default RecipeDetails
