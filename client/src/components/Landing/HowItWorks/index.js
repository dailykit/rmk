import React from 'react'

import { Cart, Home, Bag } from '../../../assets/icons'
import Button from '../../Button'

const HowItWorks = () => {
   return (
      <section className="text-center p-4 py-16 lg:p-16 text-gray-800">
         <h2 className="text-2xl lg:text-5xl font-bold mb-8">How it works?</h2>
         <div className="flex flex-col lg:flex-row mb-16">
            <div className="flex-1 m-4">
               <div className="mb-2 text-center">
                  <Home size="32" />
               </div>
               <h2 className="text-primary font-bold text-xl mb-4">
                  Choose a Restaurant Near You
               </h2>
               <p className="font-bold">
                  Select the restaurant from which you would like to order Lunch
                  and Dinner Meal Kits
               </p>
            </div>
            <div className="flex-1 m-4">
               <div className="mb-2 text-center">
                  <Cart size="32" />
               </div>
               <h2 className="text-primary font-bold text-xl mb-4">
                  Select from a Host of Recipes
               </h2>
               <p className="font-bold">
                  Choose 1 lunch and 1 dinner Recipe you like and add it to the
                  Cart before 4PM Everyday
               </p>
            </div>
            <div className="flex-1 m-4">
               <div className="mb-2 text-center">
                  <Bag size="32" />
               </div>
               <h2 className="text-primary font-bold text-xl mb-4">Delivery</h2>
               <p className="font-bold">
                  Your Meal Kit will arrive at your doorstep guaranteed the next
                  day
               </p>
            </div>
         </div>
         <div className="w-64 mx-auto">
            <Button>Get Started</Button>
         </div>
         <style>
            {`
                .flex svg {
                    margin: 0 auto;
                }
             `}
         </style>
      </section>
   )
}

export default HowItWorks
