import React from 'react'
import Keycloak from 'keycloak-js'

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

export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)
   const [user, setUser] = React.useState({})
   const [isInitialized, setIsInitialized] = React.useState(false)

   const initialize = async () => {
      const authenticated = await keycloak.init({
         onLoad: 'login-required',
         promiseType: 'native',
      })
      if (authenticated) {
         setIsInitialized(true)
         setIsAuthenticated(authenticated)
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
            const { success, data } = await fetcher(
               `${process.env.REACT_APP_DAILYKEY}/api/users/${keycloak.subject}`
            )
            if (success) {
            } else {
               const data = await fetcher(
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
               console.log('AuthProvider -> data', data)
            }
         })()
      }
   }, [isAuthenticated, user])

   const login = path => keycloak.login({ redirectUri: path })
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
            logout,
            initialize,
            clearToken,
            updateToken,
            isInitialized,
            isTokenExpired,
            isAuthenticated,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => React.useContext(AuthContext)
