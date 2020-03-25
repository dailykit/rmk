import React from 'react'

import { Layout, Cart } from '../sections'

import { DatePicker } from '../components'

const Listing = () => {
   const [restaurants] = React.useState([
      {
         title: 'Little Italy',
         logo: '',
      },
      {
         title: 'Truffles',
         logo: '',
      },
   ])
   const getInitials = title => {
      const length = title.split(' ').length
      const first = title.split(' ')[0][0]
      const last = length > 1 ? title.split(' ')[length - 1][0] : ''
      return `${first}${last}`
   }
   return (
      <Layout>
         <div className="jumbotron bg-center bg-no-repeat bg-cover h-64 flex items-center pl-16">
            <h1 className="text-white text-4xl font-light">
               Your local restaurants are now serving Meal Kits
            </h1>
         </div>
         <h2 className="font-medium tracking-wider uppercase text-gray-500 pb-2 pt-4 pl-4 text-sm">
            Hungerboard
         </h2>
         <DatePicker getSelectedDay={day => console.log(day)} />
         <div className="wrapper p-6">
            <div className="w-full">
               <h1 className="text-3xl py-4 font-medium text-blue-900">
                  Restaurants
               </h1>
               <ul>
                  {restaurants.map(restaurant => (
                     <li
                        key={restaurant.title}
                        className="border p-3 flex items-center justify-between mb-4"
                     >
                        <div className="flex items-center">
                           <span className="bg-gray-300 h-24 w-24 flex items-center justify-center">
                              {restaurant.logo ? (
                                 <img
                                    className="h-full object-cover"
                                    src={restaurant.logo}
                                    alt={restaurant.title}
                                 />
                              ) : (
                                 <span className="text-2xl">
                                    {getInitials(restaurant.title)}
                                 </span>
                              )}
                           </span>
                           <h2 className="text-2xl text-blue-900 ml-3">
                              {restaurant.title}
                           </h2>
                        </div>
                        <button className="w-auto h-12 px-3 bg-primary text-white">
                           View Menu
                        </button>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="mt-8">
               <Cart />
            </div>
         </div>
         <style jsx>
            {`
               .jumbotron {
                  background-image: url('/img/menu-hero.jpg');
               }
               .wrapper {
                  display: grid;
                  grid-template-columns: 1fr 360px;
                  grid-gap: 20px;
               }
            `}
         </style>
      </Layout>
   )
}

export default Listing
