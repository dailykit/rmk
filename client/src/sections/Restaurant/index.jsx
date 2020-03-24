import React from 'react'

import Section from '../Section'

const Restaurant = ({ menus }) => {
   const [menu] = menus
   const [
      lunch,
      dinner,
   ] = menu.menuCollections[0].menuCollection[0].categories[0].products[0].items
   return (
      <div className="border border-gray-300 p-4">
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">{menu.name}</h1>
               <p className="text-gray-600">
                  Select your preferred recipes for Lunch and Dinner
               </p>
            </div>
            <button className="w-auto h-12 px-3 bg-primary text-white">
               Select Plan
            </button>
         </header>
         {lunch && (
            <Section
               type="Lunch"
               count={lunch.recipes.length}
               recipes={lunch.recipes}
            />
         )}
         {dinner && (
            <Section
               type="Dinner"
               count={dinner.recipes.length}
               recipes={dinner.recipes}
            />
         )}
      </div>
   )
}

export default Restaurant
