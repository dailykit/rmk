import React from 'react'

import cook from '../assets/img/cook.webp'
import { Footer, Button } from '../components'

const Community = () => {
   return (
      <section className="text-gray-800">
         <div className="bg-community p-32"></div>
         <div className="p-8 lg:p-16">
            <p className="text-lg mb-8">
               Hey, This may be your first time with meal kits or you may be a
               regular customer of meal kits. Till now, the only options for
               ordering you have had were from companies working nationwide and
               delivering through a centralized location, but now DailyKIT and
               RestaurantMealKits.com are bringing your local and favorite
               restaurants to offer you a meal kit better than any other
               shipping company.
            </p>
            <p className="text-lg mb-8">
               When you purchase Meal Kits from these restaurants, you’re not
               only getting a better product in the least amount of time,
               greater freshness, lesser packaging and more environmentally
               sustainable but also supporting your local economy.
            </p>
            <p className="text-lg mb-4">
               Here’s how you help your local community when buying meal kits
               from your local restaurants?
            </p>
            <ol className="text-lg mb-8 list-decimal pl-4">
               <li className="mb-2">
                  The dollars spent for your local restaurants strengthens your
                  local community by propelling greater development and growth.
               </li>
               <li className="mb-2">
                  These local restaurants in turn get to support their local
                  partners, farmers and purveyors thus the chain of economic
                  growth gets strengthened.
               </li>
               <li className="mb-2">
                  This increased demand for local meal kits, will allow them to
                  hire more people from local communities with better wages and
                  benefits.
               </li>
            </ol>
            <p className="text-xl mb-8 font-bold">
               So, show your love for these businesses, buy a meal kit today and
               share your happiness over. Good Karma will follow!
            </p>
            <div className="w-full lg:w-1/4">
               <Button>Get Started</Button>
            </div>
         </div>
         <Footer />
         <style>
            {`
               .bg-community {
                  background: url(${cook});
                  height: 500px;
                  background-size: cover;
                  background-position: center;
               }
            `}
         </style>
      </section>
   )
}

export default Community
