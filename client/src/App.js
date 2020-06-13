import React from 'react'
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { MenuProvider } from './context/menu'
import { useAuth } from './context/auth'

// import Home from './pages'
import Listing from './pages/listing'
import Landing from './pages/landing'
import Community from './pages/community'
import Restaurant from './pages/restaurant'
import Account from './pages/user/account'
import Address from './pages/user/addresses'
import Orders from './pages/user/orders'
import Payment from './pages/user/payment'
import Settings from './pages/user/settings'

const App = () => {
   const { isAuthenticated, loginUrl, isIframeOpen } = useAuth()

   React.useEffect(() => {
      if (isAuthenticated) {
         if (window.location !== window.parent.location) {
            window.parent.location.reload()
         }
      }
   }, [isAuthenticated])

   return (
      <>
         <Route path="/" exact component={Landing} />
         <Route path="/help-community" exact component={Community} />
         <MenuProvider>
            <Route path="/restaurants" exact component={Listing} />
            <Route path="/restaurants/:id" exact component={Restaurant} />
         </MenuProvider>
         <Route path="/user/account" exact component={Account} />
         <Route path="/user/address" exact component={Address} />
         <Route path="/user/orders" exact component={Orders} />
         <Route path="/user/payment" exact component={Payment} />
         <Route path="/user/settings" exact component={Settings} />
         {!isAuthenticated && isIframeOpen && (
            <LoginFrame>
               <iframe
                  className="w-full h-full"
                  src={loginUrl}
                  frameBorder="0"
               />
            </LoginFrame>
         )}
      </>
   )
}
export default App

const LoginFrame = styled.div`
   position: fixed;
   top: 64px;
   left: 0;
   right: 0;
   bottom: 0;
`
