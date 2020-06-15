import React from 'react'
import Keycloak from 'keycloak-js'
import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'
import { CUSTOMER } from '../../graphql'

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
   const [isInitialized, setIsInitialized] = React.useState(false)
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)
   const [loginUrl, setLoginUrl] = React.useState('')
   const [isIframeOpen, setIsIframeOpen] = React.useState(false)
   const [fetchCustomer, { data: { customer = {} } = {} }] = useLazyQuery(
      CUSTOMER
   )

   const initialize = async () => {
      const authenticated = await keycloak.init({
         onLoad: 'check-sso',
         promiseType: 'native',
      })
      setIsInitialized(true)
      if (authenticated) {
         setIsAuthenticated(authenticated)
         const profile = await keycloak.loadUserInfo()
         await fetchCustomer({
            variables: { keycloakId: profile.sub },
         })
      }
   }

   React.useEffect(() => {
      initialize()
      setLoginUrl(keycloak.createLoginUrl())
   }, [])

   const login = () => keycloak.login()
   const logout = () => keycloak.logout()
   const register = () => keycloak.register()

   return (
      <AuthContext.Provider
         value={{
            login,
            logout,
            keycloak,
            customer,
            register,
            loginUrl,
            isIframeOpen,
            isInitialized,
            isAuthenticated,
            setIsIframeOpen,
         }}
      >
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth = () => React.useContext(AuthContext)
