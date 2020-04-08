import React from 'react'

import lunch from '../../../assets/img/lunch.webp'
import dinner from '../../../assets/img/dinner.webp'
import Button from '../../Button'

import { useAuth } from '../../../context/auth'
import { Link } from 'react-router-dom'

const FlexCards = () => {
   const { signup } = useAuth()
   return (
      <>
         <section className="p-4 lg:p-16 text-center font-semibold mb-8 text-gray-800">
            <h3 className="text-primary text-lg lg:text-2xl mb-4">
               Super markets Sold Out? Staring at a Lockdown?
            </h3>
            <h2 className="text-primary text-2xl lg:text-4xl font-bold mb-12">
               Don't fret!
            </h2>
            <p className="font-medium text-md lg:text-lg mb-2">
               Our local restaurants are ready to serve you Meal Kits at your
               home.
            </p>
            <Link to="/help-community">
               <p className="font-medium text-md lg:text-lg text-primary underline">
                  When you buy meal kits from us, you’re not only helping
                  yourself but helping your local community.
               </p>
            </Link>
         </section>
         <section className="text-center py-16">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4">
               What's in your
               <span className="text-primary text-2xl lg:text-5xl font-black">
                  {' '}
                  Restaurant Meal Kit?
               </span>
            </h1>
            <p className="font-semibold mb-4">
               Your Daily Kit is a set of 2 Recipes of Lunch and Dinner of 4
               Servings Each from a Single Restaurant.
            </p>
            <div className="flexers flex flex-col lg:flex-row mb-16">
               <div className="flexer flex-1 h-full relative overflow-hidden">
                  <div className="absolute p-4 w-full text-left bottom-0">
                     <h2 className="text-white font-bold text-4xl">Lunch</h2>
                     <h3 className="text-white font-medium text-3xl mb-2 lg:mb-16">
                        serves 4
                     </h3>
                     <p className="text-white font-medium mb-2">
                        Explore and order your preferred lunch meal kits from
                        your local restaurants.
                     </p>
                     <div className="w-2/4">
                        <Button onClick={() => signup()}>Explore Lunch</Button>
                     </div>
                  </div>
               </div>
               <div className="flexer flex-1 h-full relative overflow-hidden">
                  <div className="absolute p-4 w-full text-left bottom-0">
                     <h2 className="text-white font-bold text-4xl">Dinner</h2>
                     <h3 className="text-white font-medium text-3xl mb-2 lg:mb-16">
                        serves 4
                     </h3>
                     <p className="text-white font-medium mb-2">
                        Explore and order your preferred dinner meal kits from
                        your local restaurants.
                     </p>
                     <div className="w-2/4">
                        <Button onClick={() => signup()}>Explore Dinner</Button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="font-semibold text-center mb-12 px-8">
               <p className="italic text-gray-700 mb-16 flex flex-col lg:flex-row justify-evenly">
                  <span className="mb-4 lg:mb-0">
                     Carefully crafted Recipes by your favorite Restaurants
                  </span>
                  <span className="mb-4 lg:mb-0">
                     Perfectly portioned ingredients
                  </span>
                  <span className="mb-4 lg:mb-0">
                     Step by Step Instructions on how to cook
                  </span>
               </p>
               <p className="text-lg">
                  only <span className="text-5xl font-extrabold"> $8.5</span>{' '}
                  per serving
               </p>
            </div>
            <div className="w-64 mx-auto">
               <Button onClick={() => signup()}>Get Started</Button>
            </div>
         </section>
         <style>{`
            .flexers {
                height: 500px;
            }
            .flexer {
                flex: 1;
            }
            .flexer > div {
               bottom: -150px;
               transition: .5s ease;
            }
            @media only screen and (max-width: 1024px) {
               .flexer > div {
                  bottom: 0px;
                  transition: .5s ease;
               }
             }
            .flexer:hover > div {
               bottom: 10px;
            }
            .flexer:nth-child(1) {
                background: url(${lunch});
                background-position: center;
                background-size: cover;
            }
            .flexer:nth-child(2) {
                background: url(${dinner});
                background-position: center;
                background-size: cover;
            }
        `}</style>
      </>
   )
}

export default FlexCards
