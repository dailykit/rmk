import React from 'react'
import { useParams } from 'react-router-dom'

import { Layout } from '../sections'

import { MenuContext } from '../context/menu'

import { Menu, RecipeDetails } from '../sections'

const Restaurant = () => {
   const params = useParams()
   const [tunnel, toggleTunnel] = React.useState(false)
   const { dispatch } = React.useContext(MenuContext)
   React.useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(`/menu/${params.id}`)
            const { data } = await response.json()
            dispatch({ type: 'SELECT_MENU', payload: data.menu })
         } catch (error) {
            console.log(error.message)
         }
      })()
   }, [params.id])
   return (
      <Layout>
         <Menu toggleTunnel={toggleTunnel} />
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
      </Layout>
   )
}

export default Restaurant
