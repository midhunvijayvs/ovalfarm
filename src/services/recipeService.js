import { RECIPES } from '../Constants'

// Where the pages get recipe data from.
// Right now it reads RECIPES from Constants.js. When the database is ready, change
// these two functions to call the API instead, for example:
//
//   import API from '../API'
//   export const getRecipes = () => API.get('/recipes/').then((res) => res.data)
//   export const getRecipeById = (id) => API.get(`/recipes/${id}/`).then((res) => res.data)
//
// The pages already wait for the result, so nothing else needs to change.

export const getRecipes = () => Promise.resolve(RECIPES)

export const getRecipeById = (id) => {
  const recipe = RECIPES.find((item) => String(item.id) === String(id))
  return Promise.resolve(recipe || null)
}
