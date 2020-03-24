import React from 'react'

const Cart = () => {
   return (
      <React.Fragment>
         <div className="bg-white p-2">
            <div className="title border-gray-500 text-2xl font-semibold mb-8">
               YOUR DAILY KITS
            </div>
            <div className="cart-content">
               <div className="progress border"></div>
               <div>
                  <div>
                     <h3 className="mb-4">Meals selected</h3>
                     <div className="border border-gray-300 p-4 mb-16">
                        <h2 className="mb-4 text-md font-medium">
                           Asian Restaurant name
                        </h2>
                        <div className="lunch-tile bg-white p-2 shadow font-bold mb-2">
                           English Lunch
                        </div>
                        <div className="dinner-tile bg-white p-2 shadow font-bold">
                           English Dinner
                        </div>
                     </div>
                  </div>
                  <div className="font-medium mb-16">
                     We're waiting for restaurant to confirm your order. Stay
                     put!
                  </div>
                  <div className="font-medium">
                     <small>Delivering at:</small>
                     <h3>1271, S Indiana Avenue, Chicago, Illinois, 60001</h3>
                     <span className="text-blue-500 cursor-pointer text-sm">
                        Change address
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <style jsx>{`
            .title {
               border-bottom: 1px solid #ececec;
            }
            .cart-content {
               display: grid;
               grid-template-columns: 2rem 1fr;
            }
            .lunch-tile {
               border-left: 4px solid #f6ad55;
            }
            .dinner-tile {
               border-left: 4px solid #2a4365;
            }
         `}</style>
      </React.Fragment>
   )
}

export default Cart
