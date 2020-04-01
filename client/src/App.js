import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import 'react-toastify/dist/ReactToastify.css'

import { UserProvider } from './context/User'
import { MenuProvider } from './context/menu'

import Home from './pages'
import Onboarding from './pages/onboarding/index'
import Login from './pages/login'
import OnboardingAddress from './pages/onboarding/address'
import OnboardingPayment from './pages/onboarding/payment'
import Listing from './pages/listing'
import Restaurant from './pages/restaurant'
import Account from './pages/user/account'
import Address from './pages/user/addresses'
import Orders from './pages/user/orders'
import Payment from './pages/user/payment'
import Settings from './pages/user/settings'

const stripePromise = loadStripe('pk_test_YimZaa4yE2vqtcLy2Uf70NzR00CZwdOVk3')

const App = () => {
   return (
      <Elements stripe={stripePromise}>
         <UserProvider>
            <Router>
               <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
               />
               {/* <Route path="/" exact component={Home} />
               <Route path="/onboarding" exact component={Onboarding} />
               <Route path="/login" exact component={Login} />
               <Route path="/address" exact component={OnboardingAddress} />
               <Route path="/payment" exact component={OnboardingPayment} /> */}
               <Route path="/" exact component={Listing} />
               <MenuProvider>
                  <Route path="/restaurants/:id" exact component={Restaurant} />
               </MenuProvider>
               <Route path="/user/account" exact component={Account} />
               <Route path="/user/address" exact component={Address} />
               <Route path="/user/orders" exact component={Orders} />
               <Route path="/user/payment" exact component={Payment} />
               <Route path="/user/settings" exact component={Settings} />
            </Router>
         </UserProvider>
      </Elements>
   )
}
export default App
