import React from 'react'

const UserContext = React.createContext()

const state = {
   id: '',
   name: '',
   zip: '',
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SIGNUP':
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

export { UserContext, state, reducers }
