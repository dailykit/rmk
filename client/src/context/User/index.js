import React from 'react'

export const UserContext = React.createContext()

const initialState = {
   id: '',
   name: '',
   zip: '',
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'LOGIN':
         return {
            ...state,
            id: payload.value.id,
            name: payload.value.name,
         }
      case 'ZIP':
         return {
            ...state,
            zip: payload.value,
         }
      default:
         return state
   }
}

export const UserProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
      <UserContext.Provider value={{ state, dispatch }}>
         {children}
      </UserContext.Provider>
   )
}
