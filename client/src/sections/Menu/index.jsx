import React from 'react'

import Section from '../Section'

import { MenuContext } from '../../context/menu'
import { useAuth } from '../../context/auth'

import { fetcher, getToday } from '../../utils'

import { initialState, reducers } from './state'

const Restaurant = () => {
   const { user } = useAuth()
   const [state, dispatch] = React.useReducer(reducers, initialState)
   const { state: menuState, dispatch: menuDispatch } = React.useContext(
      MenuContext
   )

   const evaluate = type => {
      const products = menuState.restaurant.products
      const product = products.find(product => product.label === type)
      const defaultRecipe = product.customizableProduct.customizableProductOptions.find(
         option =>
            option.simpleRecipeProduct.id ===
            product.customizableProduct.default.simpleRecipeProductId
      ).simpleRecipeProduct
      return {
         product,
         defaultRecipe,
         customizableProductId: product.customizableProductId,
         meal: product.customizableProduct.customizableProductOptions,
      }
   }

   React.useEffect(() => {
      if (Object.keys(menuState.restaurant).length > 0) {
         const {
            meal: lunch,
            product: lunchProduct,
            defaultRecipe: defaultLunchRecipe,
            customizableProduct: lunchCustomizableProductId,
         } = evaluate('lunch')
         const {
            meal: dinner,
            product: dinnerProduct,
            defaultRecipe: defaultDinnerRecipe,
            customizableProduct: dinnerCustomizableProductId,
         } = evaluate('dinner')

         dispatch({
            type: 'SET_LUNCH',
            payload: {
               lunch,
               lunchCustomizableProductId,
               lunchDefault: defaultLunchRecipe,
               lunchComboProductComponentId: lunchProduct.id,
            },
         })
         dispatch({
            type: 'SET_DINNER',
            payload: {
               dinner,
               dinnerCustomizableProductId,
               dinnerDefault: defaultDinnerRecipe,
               dinnerComboProductComponentId: dinnerProduct.id,
            },
         })
      }
   }, [menuState.restaurant])

   const selectOrder = async () => {
      menuDispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'lunch', value: state.lunchDefault },
      })
      menuDispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'dinner', value: state.dinnerDefault },
      })

      /*
      const { success, data } = await fetcher(
         `${process.env.REACT_APP_RMK_URI}/orders`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               date: new Intl.DateTimeFormat('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
               }).format(getToday()),
               userId: user.id,
               addressId: user.addresses.find(address => address.is_default).id,
               restaurant: {
                  id: menuState.restaurant.id,
               },
               lunch: {
                  label: 'lunch',
                  simpleRecipeProductId: state.lunchDefault.id,
                  comboProductId: menuState.restaurant.comboProductId,
                  customizableProductId: state.lunchCustomizableProductId,
                  lunchComboProductComponentId: state.lunchComboProductComponentId
               },
               dinner: {
                  label: 'dinner',
                  simpleRecipeProductId: state.dinnerDefault.id,
                  comboProductId: menuState.restaurant.comboProductId,
                  customizableProductId: state.dinnerCustomizableProductId,
                  dinnerComboProductComponentId: state.dinnerComboProductComponentId
               },
            }),
         }
      )
      */
   }

   return (
      <div>
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">{menuState.restaurant.name}</h1>
               <p className="text-gray-600">
                  Select your preferred recipes for Lunch and Dinner
               </p>
            </div>
            <button
               className="w-auto h-12 px-3 bg-primary text-white"
               onClick={() => selectOrder()}
            >
               Select
            </button>
         </header>
         {state.lunch.length > 0 && (
            <Section
               type="Lunch"
               recipes={state.lunch}
               defaultRecipe={state.lunchDefault}
               onClick={recipe =>
                  dispatch({ type: 'SET_LUNCH_DEFAULT', payload: recipe })
               }
            />
         )}
         {state.dinner.length > 0 && (
            <Section
               type="Dinner"
               recipes={state.dinner}
               defaultRecipe={state.dinnerDefault}
               onClick={recipe =>
                  dispatch({ type: 'SET_DINNER_DEFAULT', payload: recipe })
               }
            />
         )}
      </div>
   )
}

export default Restaurant
