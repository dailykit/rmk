import React from 'react'

import {
   Hero,
   FlexCards,
   HowItWorks,
   Benefits,
   Delivery,
   Partner,
   Footer,
   FAQ,
   CTA,
} from '../components'

import { Logo } from '../assets/icons'

import { useAuth } from '../context/auth'

const Landing = () => {
   const { login } = useAuth()
   return (
      <>
         <header>
            <nav className="top-0 fixed bg-white w-full h-16 flex flex-row items-center justify-between px-8 border-b">
               <span className="w-32">
                  <Logo />
               </span>
               <button
                  onClick={() => login()}
                  className="w-auto h-12 px-3 bg-primary text-white rounded"
               >
                  Login
               </button>
            </nav>
         </header>
         <Hero />
         <FlexCards />
         <HowItWorks />
         <Benefits />
         <Delivery />
         <Partner />
         <FAQ />
         <CTA />
         <Footer />
      </>
   )
}

export default Landing
