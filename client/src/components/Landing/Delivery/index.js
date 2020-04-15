import React from 'react'

import img from '../../../assets/img/delivery.webp'

const Delivery = () => {
   return (
      <section className="bg px-8 py-16 lg:py-32 lg:p-32 text-center">
         <h2 className="text-white font-bold text-3xl lg:text-5xl mb-8">
            Contactless delivery!
         </h2>
         <p className="text-white font-semibold w-full lg:w-2/4 mx-auto">
            We are fully equipped to follow all the safety measures and
            protocols to make sure your food is completely safe. Our delivery
            personnel will leave your package outside your door at a suitable
            place on a clean surface.
         </p>
         <style>
            {`
                .bg {
                    background: url(${img});
                  //   background-attachment: fixed;
                    background-position: top;
                    background-size: cover;
                }
             `}
         </style>
      </section>
   )
}

export default Delivery
