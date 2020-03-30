import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { AuthProvider } from './context/auth'

import './global.css'
import './styles.css'

ReactDOM.render(
   <AuthProvider>
      <App />
   </AuthProvider>,
   document.getElementById('root')
)
