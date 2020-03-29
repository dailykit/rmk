import React from 'react'

import { MenuContext } from '../../context/menu'

const RecipeCard = ({ selected, recipe, onClick, noDetails }) => {
   const { dispatch } = React.useContext(MenuContext)

   const viewDetails = e => {
      e.stopPropagation()
      dispatch({ type: 'TOGGLE_TUNNEL' })
   }
   return (
      <li
         className={`flex flex-col bg-white p-2 rounded overflow-hidden  ${
            selected ? 'border-2 border-primary' : 'border border-gray-300'
         }`}
         onClick={onClick}
      >
         <div className="flex items-center justify-center h-48 bg-gray-200 mb-2 rounded overflow-hidden">
            {recipe.thumb ? (
               <img
                  className="h-full w-full object-cover select-none"
                  src={recipe.thumb}
                  alt={recipe.name}
                  title={recipe.name}
               />
            ) : (
               <span>No Photos</span>
            )}
         </div>
         <div className="flex items-center justify-between">
            <h4 className="cursor-pointer select-none">{recipe.name}</h4>
            {!noDetails && (
               <button
                  className="text-sm uppercase font-medium tracking-wider border border-gray-300 rounded px-1 text-gray-500"
                  onClick={viewDetails}
               >
                  View
               </button>
            )}
         </div>
      </li>
   )
}

export default RecipeCard
