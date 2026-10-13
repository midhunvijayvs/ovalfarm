import { useEffect, useState } from 'react'
import { getRecipes, getRecipeById } from '../../../services/recipeService'

export const recipeLink = (id) => `/recipies/details/${id}`

// Loads all recipes: const { recipes, isLoading } = useRecipes()
export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    getRecipes()
      .then((data) => { if (active) setRecipes(data || []) })
      .catch(() => { if (active) setRecipes([]) })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [])

  return { recipes, isLoading }
}

// Loads one recipe by id: const { recipe, isLoading } = useRecipe(id)
export const useRecipe = (id) => {
  const [recipe, setRecipe] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    setIsLoading(true)
    getRecipeById(id)
      .then((data) => { if (active) setRecipe(data) })
      .catch(() => { if (active) setRecipe(null) })
      .finally(() => { if (active) setIsLoading(false) })
    return () => { active = false }
  }, [id])

  return { recipe, isLoading }
}

// 0.25 -> "¼", 1.5 -> "1½", 2 -> "2"
const FRACTIONS = { 0.25: '¼', 0.5: '½', 0.75: '¾', 0.33: '⅓', 0.67: '⅔' }
export const formatQuantity = (quantity) => {
  if (quantity === null || quantity === undefined || quantity === '') return ''
  const number = Number(quantity)
  if (Number.isNaN(number)) return String(quantity)
  const whole = Math.floor(number)
  const fraction = FRACTIONS[Math.round((number - whole) * 100) / 100]
  if (!fraction) return String(number)
  return whole ? `${whole}${fraction}` : fraction
}

// Cooking instructions are stored one step per line
export const splitSteps = (text) =>
  (text || '').split('\n').map((step) => step.trim()).filter(Boolean)
