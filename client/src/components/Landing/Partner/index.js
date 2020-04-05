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
               Partner with RMK! Download the Catalog to know more.
            </p>
            <div className="w-64 mx-auto">
               <Button>Download Catalog</Button>
            </div>
         </section>
         <section className="p-8 py-16 lg:p-32 text-center">
            <h2 className="font-bold text-2xl lg:text-4xl mb-16">
               Get your Restaurant Meal Kit
            </h2>
            <div className="w-64 mx-auto">
               <Button>Get Started</Button>
            </div>
         </section>
      </>
   )
}

export default Partner
