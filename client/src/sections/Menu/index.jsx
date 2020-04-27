import React from 'react'

import Section from '../Section'

import { MenuContext } from '../../context/menu'
import { useAuth } from '../../context/auth'

import { fetcher, getToday } from '../../utils'

const Restaurant = () => {
   const { user } = useAuth()
   const [lunch, setLunch] = React.useState([])
   const [lunchDefault, setLunchDefault] = React.useState({})
   const [
      lunchCustomizableProduct,
      setLunchCustomizableProduct,
   ] = React.useState(null)
   const [dinner, setDinner] = React.useState([])
   const [dinnerDefault, setDinnerDefault] = React.useState({})
   const [
      dinnerCustomizableProduct,
      setDinnerCustomizableProduct,
   ] = React.useState(null)
   const { state, dispatch } = React.useContext(MenuContext)

   React.useEffect(() => {
      if (Object.keys(state.restaurant).length > 0) {
         const products = state.restaurant.products

         const lunchProduct = products.find(
            product => product.label === 'lunch'
         ).customizableProduct
         const defaultLunchRecipe = lunchProduct.customizableProductOptions.find(
            option =>
               option.simpleRecipeProduct.id ===
               lunchProduct.default.simpleRecipeProductId
         ).simpleRecipeProduct

         const dinnerProduct = products.find(
            product => product.label === 'dinner'
         ).customizableProduct
         const defaultDinnerRecipe = dinnerProduct.customizableProductOptions.find(
            option =>
               option.simpleRecipeProduct.id ===
               dinnerProduct.default.simpleRecipeProductId
         ).simpleRecipeProduct

         setLunch(lunchProduct.customizableProductOptions || [])
         setLunchDefault(defaultLunchRecipe || {})
         setLunchCustomizableProduct(lunchProduct.id)
         setDinner(dinnerProduct.customizableProductOptions || [])
         setDinnerDefault(defaultDinnerRecipe || {})
         setDinnerCustomizableProduct(dinnerProduct.id)
      }
   }, [state.restaurant])

   const selectOrder = async () => {
      dispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'lunch', value: lunchDefault },
      })
      dispatch({
         type: 'SELECT_FOR_TODAY',
         payload: { key: 'dinner', value: dinnerDefault },
      })
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
                  id: state.restaurant.id,
               },
               lunch: {
                  label: 'lunch',
                  simpleRecipeProductId: lunchDefault.id,
                  customizableProductId: lunchCustomizableProduct,
               },
               dinner: {
                  label: 'dinner',
                  simpleRecipeProductId: dinnerDefault.id,
                  customizableProductId: dinnerCustomizableProduct,
               },
            }),
         }
      )
   }

   return (
      <div>
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">{state.restaurant.name}</h1>
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
         {lunch.length > 0 && (
            <Section
               type="Lunch"
               recipes={lunch}
               defaultRecipe={lunchDefault}
               onClick={recipe => setLunchDefault(recipe)}
            />
         )}
         {dinner.length > 0 && (
            <Section
               type="Dinner"
               recipes={dinner}
               defaultRecipe={dinnerDefault}
               onClick={recipe => setDinnerDefault(recipe)}
            />
         )}
      </div>
   )
}

export default Restaurant
