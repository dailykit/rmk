import React from 'react'

import { Header } from '../../sections'
import { ProfileLayout } from '../../components'

const Payment = () => {
   return (
      <div>
         <Header />
         <ProfileLayout>
            <div className="flex justify-between items-center text-md mb-4">
               <h3 className="text-lg">Payment Cards</h3>
               <span className="text-primary cursor-pointer">Add Card</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
               <div className="border rounded-lg h-auto p-4">
                  <header>
                     <span className="mb-2 inline-block rounded border bg-teal-200 border-teal-300 px-2 text-teal-700">
                        Default
                     </span>
                  </header>
                  <main>
                     <section className="mb-3 flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Name:
                        </h4>
                        <p>Alex Pinto</p>
                     </section>
                     <section className="mb-3 flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Number:
                        </h4>
                        <p>XXXX XXXX XXXX 1234</p>
                     </section>
                     <section className="flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Validity:
                        </h4>
                        <p>05/26</p>
                     </section>
                  </main>
               </div>
               <div className="border rounded-lg h-auto p-4">
                  <header>
                     <span className="mb-2 inline-block cursor-pointer rounded border border-primary  px-2 text-teal-700 hover:bg-primary hover:text-white">
                        Make Default
                     </span>
                  </header>
                  <main>
                     <section className="mb-3 flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Name:
                        </h4>
                        <p>Alex Pinto</p>
                     </section>
                     <section className="mb-3 flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Number:
                        </h4>
                        <p>XXXX XXXX XXXX 5678</p>
                     </section>
                     <section className="flex flex-1 text-gray-800">
                        <h4 className="uppercase text-gray-600 tracking-wider font-medium">
                           Validity:
                        </h4>
                        <p>08/23</p>
                     </section>
                  </main>
               </div>
            </div>
         </ProfileLayout>
      </div>
   )
}

export default Payment
