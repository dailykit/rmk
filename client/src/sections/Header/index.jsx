import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../context/auth'

import { Logo, LocationIcon } from '../../assets/icons'

const Header = () => {
   const { user, isInitialized } = useAuth()
   const history = useHistory()
   const [address] = React.useState(() => {
      const address = user?.addresses?.find(address => address.is_default) || {}
      const result = `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.zip}`
      return result
   })

   const [isDropdownVisible, setIsDropdownVisible] = React.useState(false)

   return (
      <header>
         <nav className="top-0 fixed bg-white w-full h-16 flex flex-row items-center justify-between px-8 border-b">
            <Link to="/restaurants" className="w-32">
               <Logo />
            </Link>
            <ul className="list-none h-full flex items-center">
               <li className="text-primary mr-3 flex items-center">
                  <span className="mr-2">
                     <LocationIcon className="stroke-current text-primary" />
                  </span>
                  {address && <p title={address}>{address.slice(0, 30)}</p>}
               </li>
               <li
                  className="h-full flex items-center cursor-pointer font-normal relative"
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
               >
                  {user?.firstName && (
                     <span className="h-10 w-10 flex items-center justify-center bg-primary rounded-full text-white">
                        {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
                     </span>
                  )}
                  <ul
                     className="dropdown absolute list-none bg-white z-40 w-56 shadow-lg  rounded"
                     hidden={!isDropdownVisible}
                  >
                     <li className="px-3 py-3 text-gray-600 font-normal tracking-wide">
                        {user.firstName} {user.lastName}
                     </li>
                     <hr />
                     <li
                        className="px-3 py-2 hover:bg-gray-200"
                        onClick={() => history.push('/user/account')}
                     >
                        Account
                     </li>
                     <li
                        className="px-3 py-2 hover:bg-gray-200"
                        onClick={() => history.push('/user/orders')}
                     >
                        Orders
                     </li>
                     <li
                        className="px-3 py-2 hover:bg-gray-200"
                        onClick={() => history.push('/user/address')}
                     >
                        Delivery Addresses
                     </li>
                     <li
                        className="px-3 py-2 hover:bg-gray-200"
                        onClick={() => history.push('/user/payment')}
                     >
                        Payment
                     </li>
                     <li
                        className="px-3 py-2 hover:bg-gray-200"
                        onClick={() => history.push('/user/settings')}
                     >
                        Settings
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
      </header>
   )
}

export default Header
