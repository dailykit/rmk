import React from 'react'
import { useParams } from 'react-router-dom'

import { MenuContext } from '../../context/menu'

const RecipeDetails = () => {
   const params = useParams()
   const [recipe, setRecipe] = React.useState({})
   const { state, dispatch } = React.useContext(MenuContext)

   React.useEffect(() => {
      ;(async () => {
         const response = await fetch(
            `/recipe/${params.id}/${state.recipeDetails}`
         )
         const { success, data } = await response.json()
         success &&
            setRecipe({
               ...data,
               servings: data.servings.find(serving => serving.size === 4),
            })
      })()
   }, [state.recipeDetails])

   return (
      <div className="w-8/12 border-t shadow-md bg-white fixed mt-16 top-0 left-0 bottom-0">
         <header className="h-16 border-b px-3 flex items-center justify-between">
            <h2 className="font-normal text-xl">Recipe Details</h2>
            <button
               className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
               onClick={() => dispatch({ type: 'TOGGLE_TUNNEL' })}
            >
               <CloseIcon />
            </button>
         </header>
         <main
            className="overflow-y-auto"
            style={{ height: 'calc(100% - 64px)' }}
         >
            <div className="bg-gray-200 p-6">
               {Object.keys(recipe).length > 0 ? (
                  <div className="bg-white p-4">
                     <h1 className="text-gray-800 mb-3 text-3xl font-medium">
                        {recipe.name}
                     </h1>
                     <div className="w-8/12">
                        <div>
                           <img
                              className="w-full rounded"
                              src="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"
                              alt=""
                           />
                        </div>
                        <div className="flex mt-4">
                           <div className="w-24 h-16 mr-4 border border-gray-100 ">
                              <img
                                 className="w-full h-full object-cover rounded"
                                 src="https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/indian.jpg"
                                 alt=""
                              />
                           </div>
                           <div className="w-24 h-16 border border-gray-100 ">
                              <img
                                 className="w-full h-full object-cover rounded"
                                 src="https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_610/v1/hellofresh_s3/image/5dcc139c96d0db43857c2eb3-a12c2ae7.jpg"
                                 alt=""
                              />
                           </div>
                        </div>
                     </div>
                     <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                        Ingredients
                     </h2>
                     <ol className="list-decimal ml-6">
                        {recipe.servings.ingredients.map(({ ingredient }) => (
                           <li className="h-8 " key={ingredient.id}>
                              {ingredient.name}
                           </li>
                        ))}
                     </ol>
                     <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                        Nutritional Values
                     </h2>
                     <table className="w-full table-auto">
                        <tbody>
                           <tr className="border-b border-gray-300">
                              <td className="font-medium p-2">Calories:</td>
                              <td className="p-2 text-gray-600">2gm</td>
                           </tr>
                           <tr className="border-b border-gray-300">
                              <td className="font-medium p-2">Cholestrol:</td>
                              <td className="p-2 text-gray-600">1gm</td>
                           </tr>
                        </tbody>
                     </table>
                     <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                        Cooking Process
                     </h2>
                     <ol className="list-decimal ml-4">
                        {recipe.procedures.map(procedure => (
                           <li className="h-auto mb-4" key={procedure.name}>
                              <ol className="list-decimal">
                                 <h2 className="text-lg font-normal text-gray-700">
                                    {procedure.name}
                                 </h2>
                                 {procedure.steps.map(step => (
                                    <li
                                       className="h-auto mb-4 ml-4 mt-2"
                                       key={step.title}
                                    >
                                       <h3 className="text-gray-800">
                                          {step.title}
                                       </h3>
                                       <p className="mt-1 text-gray-600">
                                          {step.description}
                                       </p>
                                    </li>
                                 ))}
                              </ol>
                           </li>
                        ))}
                     </ol>
                  </div>
               ) : (
                  <span>Loading...</span>
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
