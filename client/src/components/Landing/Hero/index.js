import React from 'react'

import dailykit from '../../../assets/img/dailykit.png'
import mockup from '../../../assets/img/mockup_3x.png'
import bg from '../../../assets/img/hero.svg'
import Button from '../../Button'

import { useAuth } from '../../../context/auth'

const Hero = () => {
   const { signup } = useAuth()
   return (
      <section className="py-16 flex flex-col-reverse lg:flex-row lg:h-screen">
         <div className="bg-hero flex-1 p-8">
            <h3 className="text-primary font-extrabold uppercase mb-16 lg:mb-24 text-lg">
               Attention California
            </h3>
            <h1 className="text-blueer text-lg lg:text-3xl font-bold  mb-4 lg:mb-8">
               Your Local Restaurants are now serving Meal Kits
            </h1>
            <h4 className="text-blueer text-md lg:text-2xl font-semibold mb-16">
               Get your lunch and dinner for 4 serving at just $70
            </h4>
            <div className="flex flex-col lg:flex-row mb-2">
               <div className="w-full lg:w-1/4">
                  <Button onClick={() => signup()}>Get Started</Button>
               </div>
            </div>
            <div className="flex justify-end  mb-16 lg:mb-24">
               <span className="text-gray-500 mr-2 text-sm">secured by</span>
               <img src={dailykit} alt="DailyKIT Logo" width="100" />
            </div>
            <h3 className="text-primary font-extrabold text-lg">
               Get free delivery in 24hrs
            </h3>
         </div>
         <div className="mockup flex-1 overflow-hidden lg:py-16">
            <img src={mockup} alt="Mockup" />
         </div>
         <style>
            {`
                .bg-hero {
                    background: url(${bg});
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                }
                .mockup img{
                    transform: scale(1.3) translateX(10%)
                }
             `}
         </style>
      </section>
   )
}

export default Hero
