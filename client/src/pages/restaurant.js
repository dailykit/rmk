import React from 'react'
import { useParams } from 'react-router-dom'

import { Layout } from '../sections'

import { Menu, RecipeDetails } from '../sections'

const Restaurant = () => {
   const params = useParams()
   const [tunnel, toggleTunnel] = React.useState(false)
   const [menu, setMenu] = React.useState({})
   React.useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(`/menu/${params.id}`)
            const { data } = await response.json()
            setMenu(data.menu)
         } catch (error) {
            console.log(error.message)
         }
      })()
   }, [params.id])
   return (
      <Layout>
         <Menu toggleTunnel={toggleTunnel} menu={menu} />
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
      </Layout>
   )
}

export default Restaurant
