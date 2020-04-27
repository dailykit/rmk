import React from 'react'

import { MenuContext } from '../../context/menu'

const RecipeCard = ({ selected, recipe, onClick }) => {
   const { dispatch } = React.useContext(MenuContext)
   const [images, setImages] = React.useState([])
   const [name, setName] = React.useState('')

   const viewDetails = e => {
      e.stopPropagation()
      dispatch({ type: 'TOGGLE_TUNNEL' })
      dispatch({
         type: 'SELECT_RECIPE',
         payload: recipe.simpleRecipeProduct.id,
      })
   }

   React.useEffect(() => {
      setName(recipe.simpleRecipeProduct.simpleRecipe.name)
      setImages(recipe.simpleRecipeProduct.simpleRecipe.assets.images)
   }, [recipe])

   return (
      <li
         onClick={() => onClick(recipe)}
         className={`flex flex-col bg-white p-2 rounded overflow-hidden  ${
            selected ? 'border-2 border-primary' : 'border border-gray-300'
         }`}
      >
         <div className="flex items-center justify-center h-48 bg-gray-200 mb-2 rounded overflow-hidden">
            {images.length > 0 && images[0].url ? (
               <img
                  alt={name}
                  title={name}
                  src={images[0].url}
                  className="h-full w-full object-cover select-none"
               />
            ) : (
               <span>No Photos</span>
            )}
         </div>
         <div className="flex items-center justify-between">
            <h4 className="cursor-pointer select-none">{name}</h4>
            <button
               onClick={viewDetails}
               className="text-sm uppercase font-medium tracking-wider border border-gray-300 rounded px-1 text-gray-500"
            >
               View
            </button>
         </div>
      </li>
   )
}

export default RecipeCard
