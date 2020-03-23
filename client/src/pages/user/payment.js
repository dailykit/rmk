import React from 'react'

import { Layout } from '../../sections'
import { ProfileLayout } from '../../components'

const Payment = () => {
   return (
      <Layout>
         <ProfileLayout>
            <h4 className="text-gray-700 font-semibold mb-8">Payment Info</h4>
            <div className="flex justify-between items-center text-md mb-4">
               <h3 className="text-lg">Payment Cards</h3>
               <span className="text-blue-500 cursor-pointer">Add Card</span>
            </div>
            <div className="flex flex-col">
               <div className="bg-gray-300 h-32 w-full flex-col">
                  <div className="text-md font-semibold h-16 flex items-center px-8">
                     <span className="mr-16">XXXX XXXX XXXX 1234</span>
                     <span className="mr-16">01/8989</span>
                     <span className="mr-16">123</span>
                  </div>
                  <div className="text-md font-semibold h-16 flex items-center justify-between px-8">
                     <span>Alex Pinto</span>
                     <div>
                        <span className="text-blue-500 ml-8 cursor-pointer border-blue p-2">
                           Default
                        </span>
                        <span className="text-blue-500 ml-8 cursor-pointer">
                           Edit
                        </span>
                        <span className="text-red-500 ml-8 cursor-pointer">
                           Remove
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </ProfileLayout>
      </Layout>
   )
}

export default Payment
