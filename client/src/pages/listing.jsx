import React from 'react'
import { useSubscription } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import { Layout } from '../sections'
import { useAuth } from '../context/auth'
import { RESTAURANTS } from '../graphql'

const Listing = () => {
   const { customer } = useAuth()
   const history = useHistory()
   const [zipcode, setZipcode] = React.useState('')
   const [input, setInput] = React.useState('')

   const { error, loading, data: { restaurants = {} } = {} } = useSubscription(
      RESTAURANTS,
      {
         variables: {
            zipcode,
         },
      }
   )

   React.useEffect(() => {
      if (input.length === 5) {
         setZipcode(input)
      }
   }, [input])

   React.useEffect(() => {
      if (customer?.defaultCustomerAddress?.zipcode) {
         setZipcode(customer?.defaultCustomerAddress?.zipcode)
      }
   }, [customer])

   const getInitials = input => {
      let title = input.trim()

      if (!title) {
         console.log('--- Error(Avatar): Provided title is empty! ---')
         throw Error('Provided title is empty!')
      }

      const { length } = title.split(' ')

      const [first] = title
      const [last] = length > 1 ? title.split(' ')[length - 1] : ['']
      return `${first}${last}`.toUpperCase()
   }

   const selectRestaurant = restaurant => {
      history.push(`/restaurants/${restaurant.id}`)
   }

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
               value={input}
               placeholder="enter your zipcode"
               onChange={e => setInput(e.target.value)}
               className="border h-8 px-2 rounded text-sm"
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
                                 alt={restaurant.brandName}
                              />
                           ) : (
                              <span className="text-2xl">
                                 {getInitials(restaurant.brandName)}
                              </span>
                           )}
                        </span>
                        <h2 className="text-2xl text-blue-900 ml-3">
                           {restaurant.brandName}
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
