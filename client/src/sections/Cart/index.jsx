import React from 'react'

import { MenuContext } from '../../context/menu'
import { useAuth } from '../../context/auth'

import { fetcher } from '../../utils'

const statuses = ['SELECTED', 'CONFIRMED', 'PAYMENT_ERROR']

const Cart = () => {
   const { user } = useAuth()
   const { state, dispatch } = React.useContext(MenuContext)

   React.useEffect(() => {
      ;(async () => {
         const query = new URLSearchParams({
            userId: user.id,
            date: state.date,
         }).toString()
         const { success: orderExists, data: orderData } = await fetcher(
            `${process.env.REACT_APP_RMK_URI}/orders?${query}`
         )
         if (orderExists && statuses.includes(orderData?.status)) {
            const lunchId = orderData?.info[0].items[0].recipeId
            const dinnerId = orderData?.info[0].items[1].recipeId
            const restaurantId = orderData?.restaurant.id

            const { success: lunchExists, data: lunchData } = await fetcher(
               `${process.env.REACT_APP_RMK_URI}/recipe/${restaurantId}/${lunchId}`
            )
            const { success: dinnerExists, data: dinnerData } = await fetcher(
               `${process.env.REACT_APP_RMK_URI}/recipe/${restaurantId}/${dinnerId}`
            )
            if (lunchExists) {
               dispatch({
                  type: 'SELECT_FOR_TODAY',
                  payload: { key: 'lunch', value: lunchData },
               })
            }
            if (dinnerExists) {
               dispatch({
                  type: 'SELECT_FOR_TODAY',
                  payload: { key: 'dinner', value: dinnerData },
               })
            }
         }
      })()
   }, [state.date])

   return (
      <div>
         <header className="flex items-center justify-between border-b pb-3">
            <span className="text-xl text-gray-700">{state.date}</span>
            <div>
               <label
                  htmlFor="skip_day"
                  className="flex items-center text-gray-500"
               >
                  <span className="pr-2">Skip for the day</span>
                  <input type="checkbox" id="skip_day" />
               </label>
            </div>
         </header>
         <main>
            <div>
               <h3 className="text-primary font-medium text-xl pt-4 pb-3">
                  1. Select your DailyKit
               </h3>
               <div className="border p-3">
                  <div className="mb-3 flex items-center justify-between">
                     <h3 className="font-medium text-gray-700">Little Italy</h3>
                     <span className="font-bold text-gray-700">$60</span>
                  </div>

                  <div className="bg-gray-200 px-4 pb-3">
                     <span className="inline-block mb-2 bg-orange-400 px-2 py-1 text-white text-sm">
                        Lunch: Serves 4 people
                     </span>
                     {Object.keys(state.selectedForToday.lunch).length > 0 && (
                        <RecipeCard
                           title={state.selectedForToday.lunch.name}
                           thumbnails={
                              state.selectedForToday.lunch.assets.images
                           }
                        />
                     )}
                     <hr className="mt-4 border-gray-300" />
                     <span className="inline-block mb-2 bg-blue-900 px-2 py-1 text-white text-sm">
                        Dinner: Serves 4 people
                     </span>
                     {Object.keys(state.selectedForToday.dinner).length > 0 && (
                        <RecipeCard
                           title={state.selectedForToday.dinner.name}
                           thumbnails={
                              state.selectedForToday.dinner.assets.images
                           }
                        />
                     )}
                  </div>
               </div>
               <h3 className="text-primary font-medium text-xl pt-3">
                  2. Payment Deducted
               </h3>
               <h3 className="text-primary font-medium text-xl pt-3 pb-3">
                  3. Order Placed
               </h3>
            </div>
         </main>
      </div>
   )
}

export default Cart

const RecipeCard = ({ thumbnails, title }) => {
   return (
      <div className="bg-white p-2 rounded-md flex">
         <div className="flex items-center justify-center bg-gray-200 rounded-md flex-shrink-0 w-24 h-16">
            {thumbnails.length > 0 && thumbnails[0].url ? (
               <img
                  alt={title}
                  src={thumbnails[0].url}
                  className="h-16 object-cover rounded-md"
               />
            ) : (
               <span>NA</span>
            )}
         </div>
         <h2 className="text-gray-700 ml-2">{title}</h2>
      </div>
   )
}
