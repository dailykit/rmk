import React from 'react'

import Section from '../Section'

const Restaurant = ({ toggleTunnel }) => {
   return (
      <div className="border border-gray-300 p-4">
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">Little Italy</h1>
               <p className="text-gray-600">
                  Select your preferred recipes for Lunch and Dinner
               </p>
            </div>
            <button className="w-auto h-12 px-3 bg-primary text-white">
               Select Plan
            </button>
         </header>
         <Section type="Lunch" toggleTunnel={toggleTunnel} count={2} />
         <Section type="Dinner" toggleTunnel={toggleTunnel} count={4} />
      </div>
   )
}

export default Restaurant
