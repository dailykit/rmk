import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../components'

const Home = () => {
   return (
      <React.Fragment>
         <div className="hero h-screen bg-bottom bg-cover pl-40 flex items-center">
            <div className="flex flex-col" style={{ width: '640px' }}>
               <p className="text-5xl text-white font-light">
                  Your{' '}
                  <span className="font-bold text-yellow-200">
                     Local Restaurants
                  </span>{' '}
                  are now serving{' '}
                  <span className="font-bold text-yellow-200">Meal Kits</span>
               </p>
               <p className="text-xl text-gray-500 my-4">
                  Groceries Sold Out? Staring at a Lock Down? Don't fret.
                  <span className="text-yellow-200 block">
                     Restaurants near you have got your back.
                  </span>
               </p>
               <Link to="/onboarding">
                  <Button>GET STARTED</Button>
               </Link>
            </div>
         </div>
         <style jsx>
            {`
               .hero {
                  background-image: url('/img/index-hero.jpg');
               }

               button::before {
                  content: '';
                  position: absolute;
                  height: 110px;
                  width: 300px;
                  border: 2px solid #3fa4ff;
                  border-top: none;
                  border-right: none;
                  top: -88px;
                  left: -314px;
               }
            `}
         </style>
      </React.Fragment>
   )
}

export default Home
