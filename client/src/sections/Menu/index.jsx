import React from 'react'

import Section from '../Section'

import { MenuContext } from '../../context/menu'
import { useAuth } from '../../context/auth'

import { fetcher } from '../../utils'

const Restaurant = () => {
   const { user } = useAuth()
   const [lunch, setLunch] = React.useState({})
   const [lunchDefault, setLunchDefault] = React.useState({})
   const [dinner, setDinner] = React.useState({})
   const [product, setProduct] = React.useState('')
   const [dinnerDefault, setDinnerDefault] = React.useState({})
   const { state, dispatch } = React.useContext(MenuContext)

   React.useEffect(() => {
      if (Object.keys(state.restaurant).length > 0) {
         const product =
            state.restaurant.menu.menuCollections[0].menuCollection[0]
               .categories[0].products[0]
         const menus = product.items
         setProduct(product.id)
         setLunch(menus[0] || {})
         setLunchDefault(menus[0]?.defaultRecipe || {})
         setDinner(menus[1] || {})
         setDinnerDefault(menus[1]?.defaultRecipe || {})
      }
   }, [state.restaurant])

   const selectOrder = async () => {
      dispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'lunch', value: lunchDefault },
      })
      dispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'dinner', value: dinnerDefault },
      })
      const { success, data } = await fetcher(
         `${process.env.REACT_APP_RMK_URI}/orders`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               date: new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
               }).format(new Date()),
               userId: user.id,
               addressId: user.addresses.find(address => address.is_default).id,
               restaurant: {
                  id: state.restaurant.id,
               },
               productId: product,
               lunch: {
                  label: 'lunch',
                  recipeId: lunchDefault.id,
                  serving: 4,
               },
               dinner: {
                  label: 'dinner',
                  recipeId: dinnerDefault.id,
                  serving: 4,
               },
            }),
         }
      )
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
               onClick={() => selectOrder()}
            >
               Select
            </button>
         </header>
         {lunch?.recipes?.length > 0 && (
            <Section
               type="Lunch"
               recipes={lunch.recipes}
               defaultRecipe={lunchDefault}
               onClick={recipe => setLunchDefault(recipe)}
            />
         )}
         {dinner?.recipes?.length > 0 && (
            <Section
               type="Dinner"
               recipes={dinner.recipes}
               defaultRecipe={dinnerDefault}
               onClick={recipe => setDinnerDefault(recipe)}
            />
         )}
      </div>
   )
}

export default Restaurant
