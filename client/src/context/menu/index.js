import React from 'react'

export const MenuContext = React.createContext()

const initialState = {
   restaurant: {},
   isTunnelOpen: false,
}

const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SELECT_MENU':
         return {
            ...state,
            restaurant: payload,
         }
      case 'TOGGLE_TUNNEL':
         return {
            ...state,
            isTunnelOpen: !state.isTunnelOpen,
         }
      default:
         return state
   }
}

export const MenuProvider = ({ children }) => {
   const [state, dispatch] = React.useReducer(reducers, initialState)
   return (
      <MenuContext.Provider value={{ state, dispatch }}>
         {children}
      </MenuContext.Provider>
   )
}
