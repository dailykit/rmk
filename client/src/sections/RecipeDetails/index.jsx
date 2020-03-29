import React from 'react'

import { MenuContext } from '../../context/menu'

const RecipeDetails = () => {
   const { state, dispatch } = React.useContext(MenuContext)
   console.log('RecipeDetails -> state', state.RecipeDetails)
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
            <div className="bg-gray-200">
               <div className="p-6">
                  <div className="bg-white p-4">
                     <h1 className="text-gray-800 mb-3 text-3xl font-medium">
                        Paneer curry & Rice
                     </h1>
                     <div className="w-full">
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
                        <li className="h-8 ">200gm chopped Potato</li>
                        <li className="h-8 ">200gm fried and sliced onion</li>
                        <li className="h-8 ">200gm chopped potato</li>
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
                     <ol className=" list-decimal ml-6">
                        <li className="h-auto mb-4">
                           Toast the buns. In a large frying pan, place the
                           buns, cut sides down, and cook over medium-high heat
                           until lightly toasted, 1 to 2 minutes. Alternatively,
                           toast them in a toaster oven. Transfer to a plate. Do
                           not clean the pan.
                        </li>
                        <li className="h-auto mb-4">
                           Make the sloppy joe filling Peel and coarsely chop
                           the onion. If using the jalapeño, remove the stem,
                           ribs, and seeds; thinly slice the jalapeño. Wash your
                           hands after handling.
                        </li>
                        <li className="h-auto mb-4">
                           Cut a small corner from the ground chicken packaging
                           and drain off any excess liquid. Transfer to a plate;
                           pat dry with a paper towel.
                        </li>
                        <li className="h-auto mb-4">
                           In the same pan used for the buns, warm 2 to 3
                           teaspoons oil over medium-high heat until hot but not
                           smoking. Add the onion and as much jalapeño as you
                           like, season with salt and pepper, and cook, stirring
                           occasionally, until starting to soften, 2 to 3
                           minutes. Add the chicken, season with salt and
                           pepper, and cook, stirring to break up the meat,
                           until lightly browned but not yet cooked through, 3
                           to 4 minutes.
                        </li>
                        <li className="h-auto mb-4">
                           Stir in the sloppy joe sauce base and ¼ cup (½ cup)
                           water and cook until the sauce is thickened slightly,
                           1 to 2 minutes. Stir in the cheddar and cook until
                           melted and the chicken is cooked through, about 1
                           minute. Remove from the heat and season to taste with
                           salt and pepper. While the sloppy joe filling cooks,
                           prepare the salad.
                        </li>
                     </ol>
                  </div>
               </div>
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
