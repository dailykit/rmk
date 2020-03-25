import React from 'react'

import Header from '../Header'
import Cart from '../Cart'

const Layout = ({ children }) => {
   return (
      <div className="min-h-screen">
         <Header />
         <main
            className="wrapper gap-8 grid p-6"
            style={{ gridTemplateColumns: '1fr 360px' }}
         >
            <section>{children}</section>
            <aside>
               <Cart />
            </aside>
         </main>
      </div>
   )
}

export default Layout
