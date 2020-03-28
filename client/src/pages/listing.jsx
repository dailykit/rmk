import React from 'react'
import { useHistory } from 'react-router-dom'

import { Layout } from '../sections'
import { UserContext } from '../context/User'

const Listing = () => {
   const history = useHistory()
   const [list, setList] = React.useState([])
   const { dispatch } = React.useContext(UserContext)

   const getInitials = (title = '') => {
      const length = title.split(' ').length
      const first = title.split(' ')[0][0]
      const last = length > 1 ? title.split(' ')[length - 1][0] : ''
      return `${first}${last}`
   }

   React.useEffect(() => {
      ;(async () => {
         const response = await fetch('/restaurants')
         const restaurants = await response.json()
         restaurants.success && setList(restaurants.data)
      })()
   }, [])

   const selectRestaurant = restaurant => {
      dispatch({ type: 'SET_MENU', payload: restaurant._id })
      history.push(`/listing/${restaurant.menu.menuId}`)
   }
   return (
      <Layout>
         <h1 className="text-3xl pb-3 font-medium text-blue-900">
            Restaurants
         </h1>
         {list.length === 0 && (
            <span className="text-xl text-gray-600 font-light">
               No restaurants are serving on this date!
            </span>
         )}
         <ul>
            {list.map(restaurant => (
               <li
                  key={restaurant._id}
                  className="border p-3 flex items-center justify-between mb-4"
               >
                  <div className="flex items-center">
                     <span className="bg-gray-300 h-24 w-24 flex items-center justify-center">
                        {restaurant.logo ? (
                           <img
                              className="h-full object-cover"
                              src={restaurant.logo}
                              alt={restaurant.name}
                           />
                        ) : (
                           <span className="text-2xl">
                              {getInitials(restaurant.name)}
                           </span>
                        )}
                     </span>
                     <h2 className="text-2xl text-blue-900 ml-3">
                        {restaurant.name}
                     </h2>
                  </div>
                  <button
                     onClick={() => selectRestaurant(restaurant)}
                     className="w-auto h-12 px-3 bg-primary text-white"
                  >
                     View Menu
                  </button>
               </li>
            ))}
         </ul>
      </Layout>
   )
}

export default Listing
