import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { MenuProvider } from './context/menu'
import { useAuth } from './context/auth'

// import Home from './pages'
import Listing from './pages/listing'
import Restaurant from './pages/restaurant'
import Account from './pages/user/account'
import Address from './pages/user/addresses'
import Orders from './pages/user/orders'
import Payment from './pages/user/payment'
import Settings from './pages/user/settings'

import { AddressModal } from './sections'

const stripePromise = loadStripe('pk_test_tOKq1xJmx07XTTAKLfntMh7f00ltRB823g')

const App = () => {
   const { isAddressAdded, isLoading } = useAuth()
   if (isLoading) return <div>Loading...</div>
   return (
      <Elements stripe={stripePromise}>
         <Router>
            {/* <Route path="/" exact component={Home} /> */}
            <MenuProvider>
               <Route path="/" exact component={Listing} />
               <Route path="/restaurants/:id" exact component={Restaurant} />
            </MenuProvider>
            <Route path="/user/account" exact component={Account} />
            <Route path="/user/address" exact component={Address} />
            <Route path="/user/orders" exact component={Orders} />
            <Route path="/user/payment" exact component={Payment} />
            <Route path="/user/settings" exact component={Settings} />
         </Router>
         {!isAddressAdded && <AddressModal />}
      </Elements>
   )
}
export default App
