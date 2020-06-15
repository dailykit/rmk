import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import App from './App'
import { AuthProvider } from './context/auth'

import './global.css'
import './styles.css'

const wsLink = new WebSocketLink({
   uri: process.env.REACT_APP_RMK_GRAPHQL_WS,
   options: {
      reconnect: true,
   },
})

const httpLink = new HttpLink({
   uri: process.env.REACT_APP_RMK_GRAPHQL,
})

const link = split(
   ({ query }) => {
      const definition = getMainDefinition(query)
      return (
         definition.kind === 'OperationDefinition' &&
         definition.operation === 'subscription'
      )
   },
   wsLink,
   httpLink
)

const client = new ApolloClient({
   link,
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <ApolloProvider client={client}>
      <Router>
         <AuthProvider>
            <App />
         </AuthProvider>
      </Router>
   </ApolloProvider>,
   document.getElementById('root')
)
