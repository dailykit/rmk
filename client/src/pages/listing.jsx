import React from 'react'
import { useHistory } from 'react-router-dom'

import { Layout } from '../sections'
import { useAuth } from '../context/auth'

const Listing = () => {
   const { user } = useAuth()
   const history = useHistory()
   const { isAddressAdded } = useAuth()
   const [list, setList] = React.useState([])

   const getInitials = (title = '') => {
      const length = title.split(' ').length
      const first = title.split(' ')[0][0]
      const last = length > 1 ? title.split(' ')[length - 1][0] : ''
      return `${first}${last}`
   }

   React.useEffect(() => {
      ;(async () => {
         if (isAddressAdded) {
            const { zip } = await user.addresses.find(
               address => address.is_default
            )
            const response = await fetch(`/restaurants/${zip}`)
            const restaurants = await response.json()
            restaurants.success && setList(restaurants.data)
         }
      })()
   }, [isAddressAdded])

   const selectRestaurant = restaurant => {
      history.push(`/restaurants/${restaurant._id}`)
   }
   return (
      <Layout>
         <h1 className="text-3xl pb-3 font-medium text-blue-900">
            Restaurants
         </h1>
         {list.length === 0 && (
            <span className="text-xl text-gray-600 font-light">
               No restaurants available in this location! We will notify you
               when a restaurant starts serving mealkits in your area.
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
