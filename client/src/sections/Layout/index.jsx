import React from 'react'

import Header from '../Header'
import Cart from '../Cart'

import { DatePicker } from '../../components'

import { MenuContext } from '../../context/menu'

const Layout = ({ children }) => {
   const { dispatch } = React.useContext(MenuContext)
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
      <div className="min-h-screen">
         <Header />
         <h2 className="font-medium tracking-wider uppercase text-gray-500 pb-2 pt-4 pl-4 text-sm">
            Hungerboard
         </h2>
         <DatePicker getSelectedDay={day => selectDay(day)} />
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
