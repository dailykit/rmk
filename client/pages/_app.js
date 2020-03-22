import '../global.css'

import { UserContext, state as initialState, reducers } from '../context/User'

export default function MyApp({ Component, pageProps }) {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
      <UserContext.Provider value={{ state, dispatch }}>
         <Component {...pageProps} />
      </UserContext.Provider>
   )
}
