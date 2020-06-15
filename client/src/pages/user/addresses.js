import React from 'react'
import styled from '@emotion/styled'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import { Header } from '../../sections'
import { ProfileLayout } from '../../components'

import { useAuth } from '../../context/auth'

import { PlusIcon, CloseIcon } from '../../assets/icons'

import { ADDRESSES, UPDATE_CUSTOMER } from '../../graphql'

const Addresses = () => {
   const { customer } = useAuth()
   const [
      fetchAddresses,
      { error, loading, data: { addresses = [] } = {} },
   ] = useLazyQuery(ADDRESSES)
   const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
      refetchQueries: ['addresses'],
   })
   const [isFormVisible, setFormVisibility] = React.useState(false)

   React.useEffect(() => {
      if (customer.keycloakId) {
         fetchAddresses({
            variables: { keycloakId: customer.keycloakId },
         })
      }
   }, [customer])

   const changeDefault = id => {
      updateCustomer({
         variables: {
            keycloakId: customer.keycloakId,
            _set: {
               defaultCustomerAddressId: id,
            },
         },
      })
   }

   const closeFrame = () => {
      setFormVisibility(false)
      window.location.reload()
   }

   if (loading)
      return (
         <div className="fixed inset-0 flex items-center justify-center">
            <img src="/img/loader.gif" alt="loading..." className="h-16" />
         </div>
      )
   if (error) return <div>{error.message}</div>
   return (
      <div>
         <Header />
         <ProfileLayout>
            <h1 className="flex items-center text-2xl text-gray-700">
               Addresses
               <span
                  onClick={() => setFormVisibility(!isFormVisible)}
                  className="flex items-center justify-center ml-2 h-8 w-8 border border-gray-300 rounded-full bg-gray-200 cursor-pointer"
               >
                  <PlusIcon
                     size={20}
                     className="stroke-current text-gray-800"
                  />
               </span>
            </h1>
            <div className="grid grid-cols-3 gap-4 mt-3">
               {addresses?.map(address => (
                  <div
                     key={address.id}
                     className="border rounded-lg h-auto p-4"
                  >
                     <header>
                        {address?.defaultAddress?.defaultCustomerAddressId ? (
                           <span className="mb-2 inline-block rounded border bg-teal-200 border-teal-300 px-2 text-teal-700">
                              Default
                           </span>
                        ) : (
                           <span
                              onClick={() => changeDefault(address.id)}
                              className="mb-2 inline-block cursor-pointer rounded border border-primary  px-2 text-teal-700 hover:bg-primary hover:text-white"
                           >
                              Make Default
                           </span>
                        )}
                     </header>
                     {address.zipcode && (
                        <p className="text-gray-800 mb-3">
                           <span className="uppercase text-gray-600 tracking-wider font-medium">
                              Zip Code:
                           </span>{' '}
                           {address.zipcode}
                        </p>
                     )}
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
                              {address.zipcode}
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
               <Frame>
                  <section className="border-l bg-white h-full float-right">
                     <header className="h-12 flex items-center justify-between px-3">
                        <h2>Add Address</h2>
                        <button
                           onClick={() => closeFrame()}
                           className="flex items-center justify-center border rounded-full w-8 h-8"
                        >
                           <CloseIcon />
                        </button>
                     </header>
                     <iframe
                        frameBorder="0"
                        className="w-full h-full"
                        src="https://dailykey.netlify.app/address/create"
                     />
                  </section>
               </Frame>
            )}
         </ProfileLayout>
      </div>
   )
}

export default Addresses

const Frame = styled.div`
   left: 0;
   right: 0;
   top: 64px;
   bottom: 0;
   position: fixed;
   background: rgba(48, 39, 39, 0.2);
   section {
      width: 480px;
   }
`
