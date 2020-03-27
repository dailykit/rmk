import React from 'react'

const RecipeCard = ({ hideCheck, recipe, toggleTunnel }) => {
   const [select, toggleSelect] = React.useState(false)
   const randomNumber = Math.random()
   return (
      <li className="flex flex-col bg-white p-2 rounded overflow-hidden border border-gray-300">
         {!hideCheck && (
            <label
               htmlFor={`select_recipe${randomNumber}`}
               className={`${
                  select ? 'bg-primary' : 'bg-white'
               } self-end h-5 w-5 border border-primary mb-2 rounded-full flex items-center justify-center cursor-pointer`}
            >
               <CheckIcon />
               <input
                  type="checkbox"
                  id={`select_recipe${randomNumber}`}
                  className="hidden"
                  value={select}
                  onChange={() => toggleSelect(!select)}
               />
            </label>
         )}
         <div className="mb-2 rounded overflow-hidden ">
            {recipe.thumb && (
               <img
                  className="w-full select-none"
                  src={recipe.thumb}
                  alt={recipe.name}
               />
            )}
         </div>
         <h4
            className="cursor-pointer select-none"
            onClick={() => toggleTunnel(true)}
         >
            {recipe.name}
         </h4>
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
