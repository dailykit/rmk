import React from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Layout } from '../sections'
import { useAuth } from '../context/auth'
import { RESTAURANTS } from '../graphql'

const Listing = () => {
   const history = useHistory()
   const [zipcode, setZipcode] = React.useState('')
   const [
      fetch,
      { error, loading, data: { restaurants = {} } = {} },
   ] = useLazyQuery(RESTAURANTS)

   const getInitials = (title = '') => {
      const length = title.split(' ').length
      const first = title.split(' ')[0][0]
      const last = length > 1 ? title.split(' ')[length - 1][0] : ''
      return `${first}${last}`
   }

   const selectRestaurant = restaurant => {
      history.push(`/restaurants/${restaurant.id}`)
   }

   const fetchRestaurants = () =>
      fetch({
         variables: {
            zipcode,
         },
      })

   if (loading)
      return (
         <div className="fixed inset-0 flex items-center justify-center">
            <img src="/img/loader.gif" alt="loading..." className="h-16" />
         </div>
      )
   if (error) return <div>{error.message}</div>
   return (
      <Layout>
         <header className="flex items-center justify-between">
            <h1 className="text-3xl pb-3 font-medium text-blue-900">
               {restaurants?.aggregate?.count || 0} restaurant
               {restaurants?.aggregate?.count > 1 ? 's' : ''} near you!
            </h1>
            <input
               type="text"
               value={zipcode}
               placeholder="enter your zipcode"
               onBlur={e => fetchRestaurants()}
               onChange={e => setZipcode(e.target.value)}
               className="border h-8 px-2 rounded text-sm"
               onKeyPress={e => e.charCode === 13 && fetchRestaurants()}
            />
         </header>
         <ul>
            {restaurants?.aggregate?.count > 0 ? (
               restaurants?.nodes?.map(({ seller: restaurant }) => (
                  <li
                     key={restaurant.id}
                     className="border p-3 flex items-center justify-between mb-4"
                  >
                     <div className="flex items-center">
                        <span className="bg-gray-300 h-24 w-24 flex items-center justify-center">
                           {restaurant.logo ? (
                              <img
                                 className="h-full object-cover"
                                 src={restaurant.logo}
                                 alt={restaurant.organization.organizationName}
                              />
                           ) : (
                              <span className="text-2xl">
                                 {getInitials(
                                    restaurant.organization.organizationName
                                 )}
                              </span>
                           )}
                        </span>
                        <h2 className="text-2xl text-blue-900 ml-3">
                           {restaurant.organization.organizationName}
                        </h2>
                     </div>
                     <button
                        onClick={() => selectRestaurant(restaurant)}
                        className="w-auto h-12 px-3 bg-primary text-white"
                     >
                        View Menu
                     </button>
                  </li>
               ))
            ) : (
               <span className="text-xl text-gray-600 font-light">
                  No restaurants available in this location! We will notify you
                  when a restaurant starts serving mealkits in your area.
               </span>
            )}
         </ul>
      </Layout>
   )
}

export default Listing
