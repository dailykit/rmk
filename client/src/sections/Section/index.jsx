import React from 'react'

import { RecipeCard } from '../../components'

const Section = ({ type, defaultRecipe, recipes, onClick }) => {
   return (
      <div className="mt-4 bg-gray-200 px-4 pb-4">
         <span
            className={`inline-block mb-2 ${
               type.toLowerCase() === 'dinner' ? 'bg-blue-900' : 'bg-orange-400'
            } px-2 py-1 text-white text-sm`}
         >
            {type}: Serves 4 people
         </span>
         <header className="mb-2 flex items-center ">
            <span className="text-gray-600">
               {recipes.length} recipes available:
            </span>
         </header>

         <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto">
            {recipes.map((recipe, index) => (
               <RecipeCard
                  recipe={recipe}
                  key={recipe.simpleRecipeProduct.id}
                  onClick={recipe => onClick(recipe.simpleRecipeProduct)}
                  selected={defaultRecipe.id === recipe.simpleRecipeProduct.id}
               />
            ))}
         </ul>
      </div>
   )
}

export default Section
