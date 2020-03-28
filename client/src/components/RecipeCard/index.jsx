import React from 'react'

const RecipeCard = ({ selected, recipe, toggleTunnel, onClick, noDetails }) => {
   const viewDetails = e => {
      e.stopPropagation()
      toggleTunnel(true)
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

const CheckIcon = ({ size = 16, color = '#fff' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <polyline points="20 6 9 17 4 12"></polyline>
   </svg>
)
