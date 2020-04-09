import React from 'react'
import { useHistory } from 'react-router-dom'

import { Header } from '../../sections'
import { ProfileLayout, Label } from '../../components'

import { useAuth } from '../../context/auth'

import { PlusIcon } from '../../assets/icons'

import { fetcher } from '../../utils'

const Addresses = () => {
   const { user } = useAuth()
   const [isFormVisible, setFormVisibility] = React.useState(false)

   const changeDefault = async addressId => {
      const { success } = await fetcher(
         `${process.env.REACT_APP_DAILYKEY}/api/addresses/default`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ addressId, userId: user.id }),
         }
      )
      if (success && window) {
         window.location.reload()
      }
   }
   return (
      <div>
         <Header />
         <ProfileLayout>
            <h1 className="flex items-center text-2xl text-gray-700">
               Addresses
               {/* <span
                  onClick={() => setFormVisibility(!isFormVisible)}
                  className="flex items-center justify-center ml-2 h-8 w-8 border border-gray-300 rounded-full bg-gray-200 cursor-pointer"
               >
                  <PlusIcon
                     size={20}
                     className="stroke-current text-gray-800"
                  />
               </span> */}
            </h1>
            <div className="grid grid-cols-2 gap-4 mt-3">
               {user.addresses.map(address => (
                  <div
                     key={address._id}
                     className="border rounded-lg h-auto p-4"
                  >
                     <header>
                        {address.is_default ? (
                           <span className="mb-2 inline-block rounded border bg-teal-200 border-teal-300 px-2 text-teal-700">
                              Default
                           </span>
                        ) : (
                           <span
                              onClick={() => changeDefault(address._id)}
                              className="mb-2 inline-block cursor-pointer rounded border border-primary  px-2 text-teal-700 hover:bg-primary hover:text-white"
                           >
                              Make Default
                           </span>
                        )}
                     </header>
                     {address.line1 && (
                        <p className="text-gray-800 mb-3">
                           <span className="uppercase text-gray-600 tracking-wider font-medium">
                              Line 1:
                           </span>{' '}
                           {address.line1}
                        </p>
                     )}
                     {address.line2 && (
                        <p className="text-gray-800 mb-3">
                           <span className="uppercase text-gray-600 tracking-wider font-medium">
                              Line 2:
                           </span>{' '}
                           {address.line2}
                        </p>
                     )}
                     <div className="flex mb-3">
                        {address.zip && (
                           <span className="flex-1 text-gray-800">
                              <span className="uppercase text-gray-600 tracking-wider font-medium">
                                 Zip Code:
                              </span>{' '}
                              {address.zip}
                           </span>
                        )}
                        {address.city && (
                           <span className="flex-1 text-gray-800">
                              <span className="uppercase text-gray-600 tracking-wider font-medium">
                                 City:
                              </span>{' '}
                              {address.city}
                           </span>
                        )}
                     </div>
                     {address.state && (
                        <span className="text-gray-800">
                           <span className="uppercase text-gray-600 tracking-wider font-medium">
                              State:
                           </span>{' '}
                           {address.state}
                        </span>
                     )}
                  </div>
               ))}
            </div>
            {isFormVisible && (
               <AddressForm setFormVisibility={setFormVisibility} />
            )}
         </ProfileLayout>
      </div>
   )
}

export default Addresses

const AddressForm = ({ setFormVisibility }) => {
   const { user } = useAuth()
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
         setFormVisibility(false)
         if (window) {
            window.location.reload()
         }
      }
   }
   return (
      <div className="fixed inset-0 bg-tint flex items-center justify-center">
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
               <div className="mt-3">
                  <button
                     type="submit"
                     className="w-auto h-12 px-3 bg-primary text-white"
                  >
                     Save Address
                  </button>
                  <button
                     onClick={() => setFormVisibility(false)}
                     className="ml-2 w-auto h-12 px-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                  >
                     Close
                  </button>
               </div>
            </form>
         </div>
      </div>
   )
}
