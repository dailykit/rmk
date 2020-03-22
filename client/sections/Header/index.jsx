import Link from 'next/link'

import { UserContext } from '../../context/User'

const Header = () => {
   const { state } = React.useContext(UserContext)
   const [isDropdownVisible, setIsDropdownVisible] = React.useState(false)

   return (
      <nav className="bg-white h-16 w-full flex flex-row items-center px-8 fixed">
         <div className="w-32">
            <img src="/img/logo.png" alt="DailyKIT Logo" />
         </div>
         <ul className="mx-16 list-none h-full flex flex-1">
            <Link href="/">
               <a>
                  <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray-dark hover:text-blue">
                     Home
                  </li>
               </a>
            </Link>
            <Link href="/menu">
               <a>
                  <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray-dark hover:text-blue">
                     Menu
                  </li>
               </a>
            </Link>
         </ul>
         <ul className="list-none h-full flex">
            <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-blue-500">
               {state.zip.length > 0 ? state.zip : 'Location'}
            </li>
            <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray-500 hover:text-blue-500">
               Cart
            </li>
            <li
               className="mx-8 h-full flex items-center cursor-pointer font-semibold relative"
               onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            >
               <img
                  src="/img/avatar.jpg"
                  className="w-10 h-10 rounded-full"
                  alt="Avatar"
               />
               <ul
                  className="dropdown absolute list-none bg-white z-40 shadow w-56 rounded-lg"
                  hidden={!isDropdownVisible}
               >
                  <li className="p-4 text-lg text-gray-500"> Alex Pinto </li>
                  <li className="py-2 px-4 cursor-pointer">
                     <Link href="/user/account">
                        <a>Account</a>
                     </Link>
                  </li>
                  <li className="py-2 px-4 cursor-pointer">
                     <Link href="/user/orders">
                        <a>Orders</a>
                     </Link>
                  </li>
                  <li className="py-2 px-4 cursor-pointer">
                     <Link href="/user/addresses">
                        <a>Delivery Addresses</a>
                     </Link>
                  </li>
                  <li className="py-2 px-4 cursor-pointer">
                     <Link href="/user/payment">
                        <a>Payment</a>
                     </Link>
                  </li>
                  <li className="py-2 px-4 cursor-pointer">
                     <Link href="/user/settings">
                        <a>Settings</a>
                     </Link>
                  </li>
               </ul>
            </li>
         </ul>
         <style jsx>
            {`
               .dropdown {
                  top: 5rem;
                  right: -2rem;
               }

               .dropdown::before {
                  content: '';
                  position: absolute;
                  background: #fff;
                  height: 1rem;
                  width: 1rem;
                  transform: rotate(45deg);
                  right: 2.5rem;
                  top: -0.5rem;
               }
            `}
         </style>
      </nav>
   )
}

export default Header
