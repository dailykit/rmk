import React from 'react'

const Cart = () => {
   return (
      <div>
         <header className="flex items-center justify-between border-b pb-3">
            <span className="text-xl text-gray-700">
               {new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
               }).format(new Date())}
            </span>
            <div>
               <label
                  htmlFor="skip_day"
                  className="flex items-center text-gray-500"
               >
                  <span className="pr-2">Skip for the day</span>
                  <input type="checkbox" id="skip_day" />
               </label>
            </div>
         </header>
         <main>
            <div>
               <h3 className="text-primary font-medium text-xl pt-4 pb-3">
                  1. Select your DailyKit
               </h3>
               <div className="border p-3">
                  <div className="mb-3 flex items-center justify-between">
                     <h3 className="font-medium text-gray-700">Little Italy</h3>
                     <span className="font-bold text-gray-700">$60</span>
                  </div>
                  <div className="bg-gray-200 px-4 pb-3">
                     <span className="inline-block mb-2 bg-orange-400 px-2 py-1 text-white text-sm">
                        Lunch: Serves 4 people
                     </span>
                     <div className="bg-white p-2 rounded-md flex">
                        <div className="flex-shrink-0">
                           <img
                              className="h-16 object-cover rounded-md"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
                              alt=""
                           />
                        </div>
                        <h2 className="text-gray-700 ml-2">
                           Lasagna Bolognese with Meal Sauce
                        </h2>
                     </div>
                     <hr className="mt-4 border-gray-300" />
                     <span className="inline-block mb-2 bg-blue-900 px-2 py-1 text-white text-sm">
                        Dinner: Serves 4 people
                     </span>
                     <div className="bg-white p-2 rounded-md flex">
                        <div className="flex-shrink-0">
                           <img
                              className="h-16 object-cover rounded-md"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
                              alt=""
                           />
                        </div>
                        <h2 className="text-gray-700 ml-2">
                           Lasagna Bolognese with Meal Sauce
                        </h2>
                     </div>
                  </div>
               </div>
               <h3 className="text-primary font-medium text-xl pt-3">
                  2. Payment Deducted
               </h3>
               <h3 className="text-primary font-medium text-xl pt-3 pb-3">
                  3. Order Placed
               </h3>
            </div>
         </main>
      </div>
   )
}

export default Cart
