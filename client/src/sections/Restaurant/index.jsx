import React from 'react'

import Section from '../Section'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const Restaurant = ({ toggleTunnel }) => {
   const history = useHistory()
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
         <Section type="Lunch" toggleTunnel={toggleTunnel} count={2} />
         <Section type="Dinner" toggleTunnel={toggleTunnel} count={4} />
      </div>
   )
}

export default Restaurant
