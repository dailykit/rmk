import React from 'react'

import { Label } from '../../components'

import { useAuth } from '../../context/auth'

import { fetcher } from '../../utils'

const AddressModal = () => {
   const { user, setIsAddressAdded } = useAuth()
   const addAddress = async e => {
      e.preventDefault()
      const data = new FormData(e.target)
      const address = {}
      for (var [key, value] of data.entries()) {
         address[key] = value
      }
      const { success } = await fetcher(
         `${process.env.REACT_APP_DAILYKEY}/api/addresses`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, id: user.id }),
         }
      )
      if (success) {
         setIsAddressAdded(true)
      }
   }
   return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
         <div
            className="bg-white h-auto rounded-lg p-4 border"
            style={{ width: '560px' }}
         >
            <h1 className="text-xl border-b pb-3 mb-3 text-gray-600">
               Address
            </h1>
            <form onSubmit={e => addAddress(e)}>
               <fieldset className="mb-4">
                  <Label htmlFor="line1">Line 1</Label>
                  <input
                     type="text"
                     name="line1"
                     className="w-full h-8 block border-b border-gray-400 focus:border-gray-500 outline-none"
                     placeholder="Enter address Line 1"
                  />
               </fieldset>
               <fieldset className="mb-4">
                  <Label htmlFor="line2">Line 2</Label>
                  <input
                     type="text"
                     name="line2"
                     className="w-full h-8 block border-b border-gray-400 focus:border-gray-500 outline-none"
                     placeholder="Enter address Line 2"
                  />
               </fieldset>
               <div className="flex">
                  <fieldset className="mb-4 mr-4">
                     <Label htmlFor="zip">Zip Code</Label>
                     <input
                        type="text"
                        name="zip"
                        placeholder="Enter zip code"
                        className="w-40 h-8 block border-b border-gray-400 focus:border-gray-500 outline-none"
                     />
                  </fieldset>
                  <fieldset className="mb-4 flex-1">
                     <Label htmlFor="city">City</Label>
                     <input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        className="w-full h-8 block border-b border-gray-400 focus:border-gray-500 outline-none"
                     />
                  </fieldset>
               </div>
               <fieldset className="">
                  <Label htmlFor="state">State</Label>
                  <input
                     type="text"
                     name="state"
                     placeholder="Enter state"
                     className="w-full h-8 block border-b border-gray-400 focus:border-gray-500 outline-none"
                  />
               </fieldset>
               <button
                  type="submit"
                  className="mt-3 w-auto h-12 px-3 bg-primary text-white"
               >
                  Save Address
               </button>
            </form>
         </div>
      </div>
   )
}

export default AddressModal
