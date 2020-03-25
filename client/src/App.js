import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import 'react-toastify/dist/ReactToastify.css'

import { UserContext, state as initialState, reducers } from './context/User'

import Home from './pages'
import Onboarding from './pages/onboarding/index'
import OnboardingAddress from './pages/onboarding/address'
import OnboardingPayment from './pages/onboarding/payment'
import Menu from './pages/menu'
import RecipeDetails from './pages/menu/menu'
import Account from './pages/user/account'
import Address from './pages/user/addresses'
import Orders from './pages/user/orders'
import Payment from './pages/user/payment'
import Settings from './pages/user/settings'

const stripePromise = loadStripe('pk_test_YimZaa4yE2vqtcLy2Uf70NzR00CZwdOVk3')

const App = () => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
      <Elements stripe={stripePromise}>
         <UserContext.Provider value={{ state, dispatch }}>
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
               <Route path="/" exact component={Home} />
               <Route path="/onboarding" exact component={Onboarding} />
               <Route path="/address" exact component={OnboardingAddress} />
               <Route path="/payment" exact component={OnboardingPayment} />
               <Route path="/menu" exact component={Menu} />
               <Route path="/menu/:id" exact component={RecipeDetails} />
               <Route path="/user/account" exact component={Account} />
               <Route path="/user/address" exact component={Address} />
               <Route path="/user/orders" exact component={Orders} />
               <Route path="/user/payment" exact component={Payment} />
               <Route path="/user/settings" exact component={Settings} />
            </Router>
         </UserContext.Provider>
      </Elements>
   )
}
export default App
