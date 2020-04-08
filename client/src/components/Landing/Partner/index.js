import React from 'react'
import Button from '../../Button'

const Partner = () => {
   return (
      <>
         <section className="text-white font-bold p-8 py-16 lg:py-32 lg:p-32 bg-blueer text-center">
            <h2 className="text-3xl lg:text-4xl mb-16">
               Are you a Restaurant looking to do Meal Kits?
            </h2>
            <p className="text-lg mb-8">
               Partner with RestaurantMealKits.com! Download the Catalog to know
               more.
            </p>
            <div className="w-64 mx-auto">
               <Button>Download Catalog</Button>
            </div>
         </section>
      </>
   )
}

export default Partner