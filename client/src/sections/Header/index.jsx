import React from 'react'
import { Link } from 'react-router-dom'

import { DatePicker } from '../../components'

import { useAuth } from '../../context/auth'
import { MenuContext } from '../../context/menu'

import { Logo, LocationIcon } from '../../assets/icons'

const Header = ({ onlyNav }) => {
   const { user } = useAuth()
   const { dispatch } = React.useContext(MenuContext)
   const [address] = React.useState(() => {
      const address = user.addresses?.find(address => address.is_default) || {}
      const result = `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.zip}`
      return result
   })

   const [isDropdownVisible, setIsDropdownVisible] = React.useState(false)

   const selectDay = day => {
      dispatch({
         type: 'SET_DATE',
         payload: new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
         }).format(day),
      })
   }

   return (
      <header>
         <nav className="top-0 fixed bg-white w-full h-16 flex flex-row items-center justify-between px-8 border-b">
            <span className="w-32">
               <Logo />
            </span>
            <ul className="list-none h-full flex items-center">
               <li className="text-primary mr-3 flex items-center">
                  <span className="mr-2">
                     <LocationIcon className="stroke-current text-primary" />
                  </span>
                  <p title={address}>{address.slice(0, 30)}</p>
               </li>
               <li
                  className="h-full flex items-center cursor-pointer font-normal relative"
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
               >
                  <span className="h-10 w-10 flex items-center justify-center bg-primary rounded-full text-white">
                     {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
                  </span>
                  <ul
                     className="dropdown absolute list-none bg-white z-40 w-56 shadow-lg  rounded"
                     hidden={!isDropdownVisible}
                  >
                     <li className="px-3 py-3 text-gray-600 font-normal tracking-wide">
                        {user.firstName} {user.lastName}
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
            <style>
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
         {!onlyNav && (
            <>
               <h2 className="font-medium tracking-wider uppercase text-gray-500 pb-2 pt-4 pl-4 text-sm">
                  Hungerboard
               </h2>
               <DatePicker getSelectedDay={day => selectDay(day)} />
            </>
         )}
      </header>
   )
}

export default Header
