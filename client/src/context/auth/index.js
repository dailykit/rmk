import React from 'react'
import Keycloak from 'keycloak-js'
import { useHistory } from 'react-router-dom'

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
   const history = useHistory()
   const [user, setUser] = React.useState({})
   const [isInitialized, setIsInitialized] = React.useState(false)
   const [isAuthenticated, setIsAuthenticated] = React.useState(false)
   const [loginUrl, setLoginUrl] = React.useState('')
   const [isIframeOpen, setIsIframeOpen] = React.useState(false)

   const initialize = async () => {
      const authenticated = await keycloak.init({
         onLoad: 'check-sso',
         promiseType: 'native',
      })
      setIsInitialized(true)
      if (authenticated) {
         setIsAuthenticated(authenticated)
         const profile = await keycloak.loadUserInfo()
         setUser(profile)
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
            user,
            login,
            logout,
            keycloak,
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
