import React from 'react'

export const MenuContext = React.createContext()

const initialState = {
   restaurant: {},
   recipeDetails: '',
   isTunnelOpen: false,
   date: '',
   selectedForToday: {
      lunch: '',
      dinner: '',
   },
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
      case 'SELECT_FOR_TODAY':
         return {
            ...state,
            selectedForToday: {
               ...state.selectedForToday,
               [payload.key]: payload.value,
            },
         }
      case 'SET_DATE':
         return { ...state, date: payload }
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
