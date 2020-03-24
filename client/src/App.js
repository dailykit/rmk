import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { UserContext, state as initialState, reducers } from './context/User'

import Home from './pages'
import Onboarding from './pages/onboarding'
import Menu from './pages/menu'
import RecipeDetails from './pages/menu/menu'
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
            <Route path="/" exact component={Home} />
            <Route path="/onboarding" exact component={Onboarding} />
            <Route path="/menu" exact component={Menu} />
            <Route path="/menu/:id" exact component={RecipeDetails} />
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
