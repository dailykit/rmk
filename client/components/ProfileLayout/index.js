import Link from 'next/link'

const ProfileLayout = ({ children }) => {
   return (
      <div className="relative">
         <aside className="fixed">
            <ul className="w-64 bg-gray-light p-8">
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link href="/user/account">
                     <a>Account</a>
                  </Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link href="/user/orders">
                     <a>Orders</a>
                  </Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link href="/user/addresses">
                     <a>Delivery Addresses</a>
                  </Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link href="/user/payment">
                     <a>Payment Info</a>
                  </Link>
               </li>
               <li className="py-8 font-semibold text-gray-dark hover:text-blue cursor-pointer">
                  <Link href="/user/settings">
                     <a>Settings</a>
                  </Link>
               </li>
            </ul>
         </aside>
         <main className="ml-64 py-12 px-24 z-10">{children}</main>
      </div>
   )
}

export default ProfileLayout
