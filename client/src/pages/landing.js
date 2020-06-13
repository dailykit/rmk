import React from 'react'
import { Link } from 'react-router-dom'

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

import { Logo, CloseIcon } from '../assets/icons'

import { useAuth } from '../context/auth'

const Landing = () => {
   const { keycloak, isIframeOpen, setIsIframeOpen, logout } = useAuth()
   return (
      <>
         <header>
            <nav className="top-0 fixed bg-white w-full h-16 flex flex-row items-center justify-between px-8 border-b z-10">
               <Link to="/" className="w-32">
                  <Logo />
               </Link>
               <div>
                  {isIframeOpen && (
                     <button
                        onClick={() => setIsIframeOpen(false)}
                        className="flex items-center justify-center w-10 h-10 px-3 border rounded"
                     >
                        <CloseIcon size={32} />
                     </button>
                  )}
                  {!isIframeOpen && !keycloak.authenticated && (
                     <button
                        onClick={() => setIsIframeOpen(true)}
                        className="w-auto h-10 px-3 bg-primary text-white rounded"
                     >
                        Login
                     </button>
                  )}
                  {keycloak.authenticated && (
                     <button
                        onClick={() => logout()}
                        className="w-auto h-10 px-3 bg-primary text-white rounded"
                     >
                        Logout
                     </button>
                  )}
               </div>
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
