import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AuthProvider } from './context/auth'
import { UserProvider } from './context/User'

import './global.css'
import './styles.css'

ReactDOM.render(
   <AuthProvider>
      <UserProvider>
         <App />
      </UserProvider>
   </AuthProvider>,
   document.getElementById('root')
)
