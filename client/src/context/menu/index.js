import React from 'react'

export const MenuContext = React.createContext()

const initialState = {
   restaurant: {},
   isTunnelOpen: false,
   recipeDetails: '',
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
      case 'SELECT_RECIPE':
         return {
            ...state,
            recipeDetails: payload,
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
