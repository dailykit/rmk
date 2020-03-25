import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { UserContext, state as initialState, reducers } from './context/User'

import Home from './pages'
import Listing from './pages/listing'
import Onboarding from './pages/onboarding'
import Menu from './pages/menu'
import Account from './pages/user/account'
import Address from './pages/user/addresses'
import Orders from './pages/user/orders'
import Payment from './pages/user/payment'
import Settings from './pages/user/settings'

const App = () => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
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
            <Route path="/listing" exact component={Listing} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/user/account" exact component={Account} />
            <Route path="/user/address" exact component={Address} />
            <Route path="/user/orders" exact component={Orders} />
            <Route path="/user/payment" exact component={Payment} />
            <Route path="/user/settings" exact component={Settings} />
         </Router>
      </UserContext.Provider>
   )
}
export default App
