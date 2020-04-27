import React from 'react'

import { MenuContext } from '../../context/menu'

const RecipeCard = ({ selected, recipe, onClick }) => {
   console.log('RecipeCard -> recipe', recipe)
   const { dispatch } = React.useContext(MenuContext)

   const viewDetails = e => {
      e.stopPropagation()
      dispatch({ type: 'TOGGLE_TUNNEL' })
      dispatch({
         type: 'SELECT_RECIPE',
         payload: recipe.simpleRecipeProduct.id,
      })
   }
   return (
      <li
         onClick={() => onClick(recipe)}
         className={`flex flex-col bg-white p-2 rounded overflow-hidden  ${
            selected ? 'border-2 border-primary' : 'border border-gray-300'
         }`}
      >
         <div className="flex items-center justify-center h-48 bg-gray-200 mb-2 rounded overflow-hidden">
            {recipe.simpleRecipeProduct.simpleRecipe.assets?.images[0]?.url ? (
               <img
                  className="h-full w-full object-cover select-none"
                  alt={recipe.simpleRecipeProduct.simpleRecipe.name}
                  title={recipe.simpleRecipeProduct.simpleRecipe.name}
                  src={
                     recipe.simpleRecipeProduct.simpleRecipe.assets?.images[0]
                        .url
                  }
               />
            ) : (
               <span>No Photos</span>
            )}
         </div>
         <div className="flex items-center justify-between">
            <h4 className="cursor-pointer select-none">
               {recipe.simpleRecipeProduct.simpleRecipe.name}
            </h4>
            <button
               className="text-sm uppercase font-medium tracking-wider border border-gray-300 rounded px-1 text-gray-500"
               onClick={viewDetails}
            >
               View
            </button>
         </div>
      </li>
   )
}

export default RecipeCard
