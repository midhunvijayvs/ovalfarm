import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'
import { recipeLink } from './recipeHelpers'

// One recipe tile, used on the recipe list, the recipe page and the home page
const RecipeCard = ({ recipe, number }) => {
  const { t, tr } = useLanguage()

  return (
    <Link to={recipeLink(recipe.id)} className='recipe-card'>
      <div className='recipe-card-image'>
        <img src={recipe.image} alt={tr(recipe.name)} loading='lazy' />
        {recipe.cooking_time ? (
          <span className='recipe-card-time'>
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' aria-hidden='true'>
              <circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' />
            </svg>
            {recipe.cooking_time} {t('minutes')}
          </span>
        ) : null}
      </div>
      <div className='recipe-card-body'>
        {number ? <span className='recipe-card-number'>{String(number).padStart(2, '0')}</span> : null}
        <h3>{tr(recipe.name)}</h3>
        <span className='recipe-card-meta'>
          {t('ingredients_count', { n: recipe.ingredients ? recipe.ingredients.length : 0 })}
        </span>
        <span className='recipe-card-link'>
          {t('view_recipe')}
          <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <path d='M5 12h14M13 6l6 6-6 6' />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default RecipeCard
