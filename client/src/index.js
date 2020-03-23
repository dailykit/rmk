import React from 'react'
import ReactDOM from 'react-dom'

// Apollo Client Imports
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'

import App from './App'
import { AuthProvider } from './context/auth'

import './global.css'
import './styles.css'

const client = new ApolloClient({
   link: ApolloLink.from([
      new HttpLink({
         uri: 'http://localhost:4000/graphql',
      }),
   ]),
   cache: new InMemoryCache(),
})

ReactDOM.render(
   <AuthProvider>
      <ApolloProvider client={client}>
         <App />
      </ApolloProvider>
   </AuthProvider>,
   document.getElementById('root')
)
