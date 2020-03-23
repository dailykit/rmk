import React from 'react'

import { Link } from 'react-router-dom'

const ProfileLayout = ({ children }) => {
   return (
      <div className="relative">
         <aside className="fixed">
            <ul className="w-64 bg-gray-light p-8">
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link to="/user/account">Account</Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link to="/user/orders">Orders</Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link to="/user/address">Delivery Addresses</Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link to="/user/payment">Payment Info</Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link to="/user/settings">Settings</Link>
               </li>
            </ul>
         </aside>
         <main className="ml-64 py-12 px-24 z-10">{children}</main>
      </div>
   )
}

export default ProfileLayout
