import React from 'react'
import axios from 'axios'
import { useQuery } from '@apollo/react-hooks'

import { useParams } from 'react-router-dom'

import { Layout } from '../sections'

import { MenuContext } from '../context/menu'

import { Menu, RecipeDetails } from '../sections'

import { RESTAURANT, COMBO_PRODUCTS } from '../graphql'

const Restaurant = () => {
   const params = useParams()
   const { state, dispatch } = React.useContext(MenuContext)
   const {
      loading,
      error,
      data: { seller: restaurant = {} } = {},
   } = useQuery(RESTAURANT, { variables: { id: params.id } })

   React.useEffect(() => {
      if (restaurant?.brandName) {
         ;(async () => {
            const { data } = await axios.post(
               `${
                  new URL(restaurant.organization.datahubUrl).origin
               }/server/api/rmk-menu`,
               {
                  year: new Date(state.date).getFullYear(),
                  month: new Date(state.date).getMonth(),
                  day: new Date(state.date).getDate(),
               }
            )

            let parsed = await Promise.all(
               data.map(async node => {
                  const {
                     data: { data: { comboProducts = [] } = {} } = {},
                  } = await axios.post(restaurant.organization.datahubUrl, {
                     query: COMBO_PRODUCTS,
                     variables: { _in: node.comboProducts },
                  })
                  return { ...node, comboProducts }
               })
            )

            dispatch({
               type: 'SELECT_MENU',
               payload: {
                  ...restaurant,
                  comboProductId: parsed[0]?.comboProducts[0]?.id,
                  products: parsed[0]?.comboProducts[0]?.comboProductComponents,
               },
            })
         })()
      }
   }, [restaurant])

   return (
      <Layout>
         <Menu />
         {state.isTunnelOpen && <RecipeDetails />}
      </Layout>
   )
}

export default Restaurant
