import React from 'react'

const Footer = () => {
   return (
      <section className="bg-gray-200 px-8 lg:px-32 py-8 font-medium">
         <div className="flex flex-col lg:flex-row justify-between mb-8">
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
            <span className="text-primary">Are you a restaurant?</span>
            <span>FAQs for Restaurants</span>
         </div>
         <div className="text-center">RestaurantMealKits.com &copy; 2020</div>
      </section>
   )
}

export default Footer
