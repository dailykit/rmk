import React from 'react'
import { useLocation } from 'react-router-dom'

import { Link } from 'react-router-dom'

const ListItem = ({ path, title }) => {
   const location = useLocation()
   return (
      <Link
         to={path}
         className={`py-4 pl-4 ${
            location.pathname === path ? 'bg-gray-200' : ''
         } hover:bg-gray-200`}
      >
         {title}
      </Link>
   )
}

const ProfileLayout = ({ children }) => {
   const [pages] = React.useState([
      { path: '/user/account', title: 'Account' },
      { path: '/user/orders', title: 'Orders' },
      { path: '/user/address', title: 'Delivery Addresses' },
      { path: '/user/payment', title: 'Payment Info' },
      { path: '/user/settings', title: 'Settings' },
   ])
   return (
      <div className="flex" style={{ height: 'calc(100vh - 64px' }}>
         <aside className="border-r flex flex-col w-64 bg-gray-100">
            {pages.map(page => (
               <ListItem key={page.path} path={page.path} title={page.title} />
            ))}
         </aside>
         <main className="py-12 px-24 flex-1">{children}</main>
      </div>
   )
}

export default ProfileLayout
