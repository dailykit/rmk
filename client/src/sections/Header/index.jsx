import React from 'react'
import { Link } from 'react-router-dom'

import { UserContext } from '../../context/User'

import { Logo } from '../../assets/icons'

const Header = () => {
   const { state } = React.useContext(UserContext)
   const [isDropdownVisible, setIsDropdownVisible] = React.useState(false)

   return (
      <nav className="bg-white h-16 w-full flex flex-row items-center justify-between px-8 fixed">
         <span className="w-32">
            <Logo />
         </span>
         <ul className="list-none h-full flex ">
            <li className="mr-4 h-full flex items-center cursor-pointer font-normal text-primary">
               {state.zip.length > 0 ? state.zip : 'Select Location'}
            </li>
            <li
               className="h-full flex items-center cursor-pointer font-normal relative"
               onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
               <img
                  src="/img/avatar.jpg"
                  className="w-10 h-10 rounded-full"
                  alt="Avatar"
               />
               <ul
                  className="dropdown absolute list-none bg-white z-40 w-56 shadow-lg  rounded"
                  hidden={!isDropdownVisible}
               >
                  <li className="px-3 py-3 text-gray-600 font-normal tracking-wide">
                     Alex Pinto
                  </li>
                  <hr />
                  <li className="px-3 py-2 hover:bg-gray-200">
                     <Link to="/user/account">Account</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-200">
                     <Link to="/user/orders">Orders</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-200">
                     <Link to="/user/address">Delivery Addresses</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-200">
                     <Link to="/user/payment">Payment</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-gray-200">
                     <Link to="/user/settings">Settings</Link>
                  </li>
               </ul>
            </li>
         </ul>
         <style jsx>
            {`
               .dropdown {
                  top: 76px;
                  right: -10px;
               }

               .dropdown::before {
                  content: '';
                  position: absolute;
                  background: #fff;
                  height: 10px;
                  width: 10px;
                  transform: rotate(45deg);
                  right: 24px;
                  top: -5px;
               }
            `}
         </style>
      </nav>
   )
}

export default Header
