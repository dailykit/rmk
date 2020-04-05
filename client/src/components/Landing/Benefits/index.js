import React from 'react'

import delivery from '../../../assets/img/delivery.svg'
import order from '../../../assets/img/order.svg'
import packaging from '../../../assets/img/packaging.svg'
import support from '../../../assets/img/support.svg'

const Benefits = () => {
   return (
      <section className="p-4 py-16 lg:py-32 lg:p-32 bg-gray-300 text-center">
         <h1 className="font-semibold text-xl mb-16">
            Why{' '}
            <span className="text-primary text-2xl lg:text-4xl font-black">
               local restaurants{' '}
            </span>
            are the future of
            <span className="text-primary text-2xl lg:text-4xl font-black">
               {' '}
               Meal kits?
            </span>
         </h1>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
               <img src={delivery} alt="Benefit" className="mx-auto mb-2" />
               <h2 className="text-primary font-bold text-2xl lg:text-4xl">
                  Daily subscription
               </h2>
               <p className="text-bold text-xl">
                  instead of weekly subscription
               </p>
            </div>
            <div>
               <img src={order} alt="Benefit" className="mx-auto mb-2" />
               <h2 className="text-primary font-bold text-2xl lg:text-4xl">
                  1 day pre-order
               </h2>
               <p className="text-bold text-xl">instead of 7 days pre-order</p>
            </div>
            <div>
               <img src={packaging} alt="Benefit" className="mx-auto mb-2" />
               <h2 className="text-primary font-bold text-2xl lg:text-4xl">
                  Minimal packing
               </h2>
               <p className="text-bold text-xl"> instead of big heavy boxes </p>
            </div>
            <div>
               <img src={support} alt="Benefit" className="mx-auto mb-2" />
               <h2 className="text-primary font-bold text-2xl lg:text-4xl">
                  Support economy
               </h2>
               <p className="text-bold text-xl"> support local restaurants </p>
            </div>
         </div>
      </section>
   )
}

export default Benefits
