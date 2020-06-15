import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { MenuContext } from '../../context/menu'
import { RECIPE } from '../../graphql/queries'

const initialState = {
   name: '',
   yield: {},
   author: '',
   cuisine: '',
   thumbnails: [],
   procedures: [],
   description: '',
   cookingTime: '',
   defaultThumb: {},
   status: 'LOADING',
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_RECIPE': {
         const { simpleRecipe = {} } = payload
         const { images: thumbnails = [] } = simpleRecipe?.assets || []
         const {
            name = '',
            author = '',
            cuisine = '',
            procedures = [],
            description = '',
            cookingTime = '',
            simpleRecipeYields = [],
         } = simpleRecipe

         return {
            ...state,
            name,
            author,
            cuisine,
            thumbnails,
            procedures,
            description,
            cookingTime,
            status: 'SUCCESS',
            defaultThumb: simpleRecipe.image,
            yield: simpleRecipeYields[0] || {},
         }
      }
      case 'SET_DEFAULT_THUMB':
         return { ...state, defaultThumb: payload }
      case 'SET_STATUS':
         return { ...state, status: payload }
      default:
         return state
   }
}

const RecipeDetails = () => {
   const params = useParams()
   const [recipe, setRecipe] = React.useState({})
   const [selectedImage, selectImage] = React.useState({})
   const [serving, setServing] = React.useState({})
   const [state, dispatch] = React.useReducer(reducers, initialState)
   const { state: menuState, dispatch: menuDispatch } = React.useContext(
      MenuContext
   )

   React.useEffect(() => {
      ;(async () => {
         const {
            data: { data: { simpleRecipeProduct = {} } = {} } = {},
         } = await axios.post(menuState.restaurant.organization.datahubUrl, {
            query: RECIPE,
            variables: {
               id: menuState.recipeDetails,
            },
         })
         if (simpleRecipeProduct?.simpleRecipe) {
            dispatch({
               type: 'SET_RECIPE',
               payload: simpleRecipeProduct,
            })
         } else {
            dispatch({ type: 'SET_STATUS', payload: 'NO_DATA' })
         }
      })()
   }, [menuState.recipeDetails])
   return (
      <div className="w-6/12 border-t shadow-md bg-white fixed mt-16 top-0 left-0 bottom-0">
         <header className="h-16 border-b px-3 flex items-center justify-between">
            <h2 className="font-normal text-xl">Recipe Details</h2>
            <button
               className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
               onClick={() => menuDispatch({ type: 'TOGGLE_TUNNEL' })}
            >
               <CloseIcon />
            </button>
         </header>
         <main
            className="overflow-y-auto"
            style={{ height: 'calc(100% - 64px)' }}
         >
            <div className="bg-gray-200 p-6">
               {state.status === 'LOADING' && (
                  <div className="bg-white p-4">
                     Fetching the recipe details for you.
                  </div>
               )}
               {state.status === 'NO_DATA' && (
                  <div className="bg-white p-4">
                     No recipe details available
                  </div>
               )}
               {state.status === 'SUCCESS' && (
                  <div className="bg-white p-4">
                     <h1 className="text-gray-800 mb-3 text-3xl font-medium">
                        {state.name}
                     </h1>
                     {state.defaultThumb && (
                        <div
                           className="w-6/12 mb-2 border rounded overflow-hidden"
                           style={{ height: '240px' }}
                        >
                           <img
                              src={state.defaultThumb}
                              className="w-full h-full border-gray-100 object-contain rounded-lg"
                           />
                        </div>
                     )}
                     <ul className="w-8/12 flex">
                        {state.thumbnails.map(image => (
                           <li
                              key={image.url}
                              className="w-24 h-16 mr-2 cursor-pointer"
                              onClick={() =>
                                 dispatch({
                                    type: 'SET_DEFAULT_THUMB',
                                    payload: image.url,
                                 })
                              }
                           >
                              <img
                                 src={image.url}
                                 className="w-full h-full border-gray-100 object-cover rounded-lg"
                              />
                           </li>
                        ))}
                     </ul>
                     <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500  text-lg font-normal">
                        Ingredients
                     </h2>
                     <span className="text-sm text-gray-500 mb-3 block">
                        *Some items may be hidden.
                     </span>
                     <ol className="list-decimal ml-6">
                        {Object.keys(state.yield).length > 0 &&
                           state.yield.ingredientSachets.map(
                              ({
                                 isVisible,
                                 slipName,
                                 ingredientSachet: sachet,
                              }) => (
                                 <li key={sachet.id} className="h-8">
                                    {isVisible
                                       ? slipName
                                       : 'Hidden by recipe author'}
                                 </li>
                              )
                           )}
                     </ol>
                     <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                        Cooking Process
                     </h2>
                     <ol className="list-decimal ml-4">
                        {state.procedures.map(procedure => (
                           <li className="h-auto mb-4" key={procedure.name}>
                              <ol className="list-decimal">
                                 <h2 className="text-lg font-normal text-gray-700">
                                    {procedure.title}
                                 </h2>
                                 {procedure.steps.map(step =>
                                    step.isVisible ? (
                                       <li
                                          key={step.title}
                                          className="h-auto mb-4 ml-4 mt-2"
                                       >
                                          <h3 className="text-gray-800">
                                             {step.title}
                                          </h3>
                                          <p className="mt-1 text-gray-600">
                                             {step.description}
                                          </p>
                                       </li>
                                    ) : (
                                       <li
                                          key={step.title}
                                          className="h-auto mb-4 ml-4 mt-2"
                                       >
                                          <h3 className="text-gray-800">
                                             Hidden by recipe author
                                          </h3>
                                       </li>
                                    )
                                 )}
                              </ol>
                           </li>
                        ))}
                     </ol>
                  </div>
               )}
            </div>
         </main>
      </div>
   )
}

export default RecipeDetails

const CloseIcon = ({ size = 20, color = '#000' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
   </svg>
)
