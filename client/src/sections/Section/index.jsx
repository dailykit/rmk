import React from 'react'

import { RecipeCard } from '../../components'

const Section = ({ type, count, defaultRecipe, recipes }) => {
   const [selected, selectRecipe] = React.useState(defaultRecipe.name)
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
            <span className="text-gray-600">{count} recipes available:</span>
         </header>
         <ul className="grid grid-cols-3 gap-4 overflow-x-auto">
            {recipes.map(({ recipe }, index) => (
               <RecipeCard
                  key={index}
                  recipe={recipe}
                  selected={selected === recipe.name}
                  onClick={() =>
                     selectRecipe(selected =>
                        selected !== recipe.name ? recipe.name : ''
                     )
                  }
               />
            ))}
         </ul>
      </div>
   )
}

export default Section
