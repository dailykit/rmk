import React from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

import Section from '../Section'

import { MenuContext } from '../../context/menu'

const Restaurant = ({ toggleTunnel }) => {
   const history = useHistory()
   const [lunch, setLunch] = React.useState({})
   const [lunchDefault, setLunchDefault] = React.useState('')
   const [dinner, setDinner] = React.useState({})
   const [dinnerDefault, setDinnerDefault] = React.useState('')
   const { state } = React.useContext(MenuContext)

   React.useEffect(() => {
      if (Object.keys(state.restaurant).length > 0) {
         const menus =
            state.restaurant.menu.menuCollections[0].menuCollection[0]
               .categories[0].products[0].items
         setLunch(menus[0] || {})
         setLunchDefault(menus[0]?.defaultRecipe || '')
         setDinner(menus[1] || {})
         setDinnerDefault(menus[1]?.defaultRecipe || '')
      }
   }, [state.restaurant])

   const selectPlan = async () => {
      try {
         // Add logic to check is default card present
         history.push('/payment')
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div>
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">{state.restaurant.name}</h1>
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
               defaultRecipe={lunchDefault}
               recipes={lunch.recipes}
               toggleTunnel={toggleTunnel}
               count={lunch.recipes.length}
            />
         )}
         {dinner?.recipes?.length > 0 && (
            <Section
               type="Dinner"
               defaultRecipe={dinnerDefault}
               recipes={dinner.recipes}
               toggleTunnel={toggleTunnel}
               count={dinner.recipes.length}
            />
         )}
      </div>
   )
}

export default Restaurant
