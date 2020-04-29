import React from 'react'
import Keycloak from 'keycloak-js'
import { useHistory } from 'react-router-dom'

import { fetcher } from '../../utils'

const keycloak = new Keycloak({
   realm: process.env.REACT_APP_KEYCLOAK_REALM,
   url: process.env.REACT_APP_KEYCLOAK_URL,
   clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
   'ssl-required': 'none',
   'public-client': true,
   'bearer-only': false,
   'verify-token-audience': true,
   'use-resource-role-mappings': true,
   'confidential-port': 0,
})

const AuthContext = React.createContext()

const excludeUrls = ['/', '/help-community']

export const AuthProvider = ({ children }) => {
   const history = useHistory()
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)
   const [user, setUser] = React.useState({})
   const [isAddressAdded, setIsAddressAdded] = React.useState(false)
   const [isInitialized, setIsInitialized] = React.useState(false)
   const [isLoading, setLoading] = React.useState(true)

   const initialize = async () => {
      let isLoggedIn = false
      if (excludeUrls.includes(window.location.pathname)) {
         const authenticated = await keycloak.init({
            onLoad: 'check-sso',
            promiseType: 'native',
         })
         if (authenticated) {
            isLoggedIn = true
            history.push('/restaurants')
         } else {
            setLoading(false)
            setIsAddressAdded(true)
         }
      } else {
         const authenticated = await keycloak.init({
            onLoad: 'login-required',
            promiseType: 'native',
         })
         if (authenticated) {
            isLoggedIn = true
         }
      }
      if (isLoggedIn) {
         setIsInitialized(true)
         setIsAuthenticated(true)
         const user = await keycloak.loadUserProfile()
         setUser(user)
      }
   }

   React.useEffect(() => {
      initialize()
   }, [])

   React.useEffect(() => {
      if (isAuthenticated && user.email) {
         ;(async () => {
            const { success: userExists, data } = await fetcher(
               `${process.env.REACT_APP_DAILYKEY}/api/users/${keycloak.subject}`
            )
            if (userExists) {
               setUser(user => ({
                  ...user,
                  id: data.user._id,
                  addresses: data.user.addresses,
               }))
               setIsAddressAdded(data.user.addresses.length > 0)
               setLoading(false)
            } else {
               const { success: userCreated, data: newUser } = await fetcher(
                  `${process.env.REACT_APP_DAILYKEY}/api/users/signup`,
                  {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({
                        email: user.email,
                        lastname: user.lastName,
                        firstname: user.firstName,
                        keycloak_id: keycloak.subject,
                     }),
                  }
               )
               if (userCreated) {
                  setUser(user => ({ ...user, id: newUser._id }))
                  await fetcher(`${process.env.REACT_APP_RMK_URI}/users`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ id: newUser._id }),
                  })
                  await fetcher(`${process.env.REACT_APP_RMK_URI}/orders`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                        timestamp: Date.now(),
                        userId: newUser._id,
                     }),
                  })
                  setIsAddressAdded(false)
                  setLoading(false)
               }
            }
         })()
      }
   }, [isAuthenticated, user.email])

   const login = () => keycloak.login()
   const signup = () => keycloak.register()
   const logout = () => keycloak.logout()
   const isTokenExpired = () => keycloak.isTokenExpired()
   const updateToken = () => keycloak.updateToken()
   const clearToken = () => keycloak.clearToken()

   keycloak.onTokenExpired = () => {
      keycloak.updateToken(5).then(refreshed => {
         if (refreshed) {
            // keycloak.token
         } else {
            keycloak.login()
         }
      })
   }

   return (
      <AuthContext.Provider
         value={{
            user,
            login,
            signup,
            logout,
            setUser,
            isLoading,
            initialize,
            clearToken,
            updateToken,
            isInitialized,
            isTokenExpired,
            isAddressAdded,
            isAuthenticated,
            setIsAddressAdded,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => React.useContext(AuthContext)
