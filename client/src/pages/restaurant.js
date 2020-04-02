import React from 'react'
import { useParams } from 'react-router-dom'

import { Layout } from '../sections'

import { MenuContext } from '../context/menu'

import { Menu, RecipeDetails } from '../sections'

const Restaurant = () => {
   const params = useParams()
   const { state, dispatch } = React.useContext(MenuContext)
   React.useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(
               `${process.env.REACT_APP_RMK_URI}/menu/${params.id}`
            )
            const { data } = await response.json()
            dispatch({ type: 'SELECT_MENU', payload: data })
         } catch (error) {
            console.log(error.message)
         }
      })()
   }, [params.id])
   return (
      <Layout>
         <Menu />
         {state.isTunnelOpen && <RecipeDetails />}
      </Layout>
   )
}

export default Restaurant
