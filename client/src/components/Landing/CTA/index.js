import React from 'react'

import { Button } from '../../../components'

import { useAuth } from '../../../context/auth'

const CTA = () => {
   const { signup } = useAuth()
   return (
      <section className="p-8 py-16 lg:p-16 text-center">
         <h2 className="font-bold text-2xl lg:text-4xl mb-16">
            Get your Restaurant Meal Kit
         </h2>
         <div className="w-64 mx-auto">
            <Button onClick={() => signup()}>Get Started</Button>
         </div>
      </section>
   )
}

export default CTA
