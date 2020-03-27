import React from 'react'

import Section from '../Section'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const Restaurant = ({ menu, toggleTunnel }) => {
   const history = useHistory()
   const [lunch, setLunch] = React.useState({})
   const [dinner, setDinner] = React.useState({})

   React.useEffect(() => {
      if (Object.keys(menu).length > 0) {
         const menus =
            menu.menuCollections[0].menuCollection[0].categories[0].products[0]
               .items
         setLunch(menus[0] || {})
         setDinner(menus[1] || {})
      }
   }, [menu])

   const selectPlan = async () => {
      try {
         // Add logic to check is default card present
         history.push('/payment')
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div className="border border-gray-300 p-4">
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">Little Italy</h1>
               <p className="text-gray-600">
                  Select your preferred recipes for Lunch and Dinner
               </p>
            </div>
            <button
               className="w-auto h-12 px-3 bg-primary text-white"
               onClick={selectPlan}
            >
               Select Plan
            </button>
         </header>
         {lunch?.recipes?.length > 0 && (
            <Section
               type="Lunch"
               recipes={lunch.recipes}
               toggleTunnel={toggleTunnel}
               count={lunch.recipes.length}
            />
         )}
         {dinner?.recipes?.length > 0 && (
            <Section
               type="Dinner"
               recipes={dinner.recipes}
               toggleTunnel={toggleTunnel}
               count={dinner.recipes.length}
            />
         )}
      </div>
   )
}

export default Restaurant
