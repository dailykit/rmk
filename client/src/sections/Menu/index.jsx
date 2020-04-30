import React from 'react'

import Section from '../Section'

import { MenuContext } from '../../context/menu'
import { useAuth } from '../../context/auth'

import { fetcher, getToday } from '../../utils'

import { initialState, reducers } from './state'

const Menu = () => {
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
      )
      return {
         product,
         customizableProductOptionId: defaultRecipe.id,
         defaultRecipe: defaultRecipe.simpleRecipeProduct,
         customizableProductId: product.customizableProduct.id,
         meal: product.customizableProduct.customizableProductOptions,
      }
   }
   React.useEffect(() => {
      if (Object.keys(menuState.restaurant).length > 0) {
         const {
            meal: lunch,
            product: lunchProduct,
            defaultRecipe: defaultLunchRecipe,
            customizableProductId: lunchCustomizableProductId,
            customizableProductOptionId: lunchCustomizableProductOptionId,
         } = evaluate('lunch')
         const {
            meal: dinner,
            product: dinnerProduct,
            defaultRecipe: defaultDinnerRecipe,
            customizableProductId: dinnerCustomizableProductId,
            customizableProductOptionId: dinnerCustomizableProductOptionId,
         } = evaluate('dinner')

         dispatch({
            type: 'SET_LUNCH',
            payload: {
               lunch,
               lunchCustomizableProductId,
               lunchCustomizableProductOptionId,
               lunchDefault: defaultLunchRecipe,
               lunchComboProductComponentId: lunchProduct.id,
            },
         })
         dispatch({
            type: 'SET_DINNER',
            payload: {
               dinner,
               dinnerCustomizableProductId,
               dinnerCustomizableProductOptionId,
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

      const lunch = {
         label: 'lunch',
         comboProductId: menuState.restaurant.comboProductId,
         customizableProductId: state.lunchCustomizableProductId,
         comboProductComponentId: state.lunchComboProductComponentId,
         customizableProductOptionId: state.lunchCustomizableProductOptionId,
         product: {
            id: state.lunchDefault.id,
            option: {
               // id: ,
            },
         },
      }
      const dinner = {
         label: 'dinner',
         comboProductId: menuState.restaurant.comboProductId,
         customizableProductId: state.dinnerCustomizableProductId,
         comboProductComponentId: state.dinnerComboProductComponentId,
         customizableProductOptionId: state.dinnerCustomizableProductOptionId,
         product: {
            id: state.dinnerDefault.id,
            option: {
               // id: ,
            },
         },
      }
      const { success, data } = await fetcher(
         `${process.env.REACT_APP_RMK_URI}/orders/${menuState.selectedForToday.id}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               status: 'SELECTED',
               restaurant: {
                  id: menuState.restaurant.id,
               },
               products: [lunch, dinner],
            }),
         }
      )
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

export default Menu
