import React from 'react'
import { useParams } from 'react-router-dom'

import { Layout } from '../sections'

import { Menu, RecipeDetails } from '../sections'
import { UserContext } from '../context/User'

const Restaurant = () => {
   const params = useParams()
   const [tunnel, toggleTunnel] = React.useState(false)
   const [menu, setMenu] = React.useState({})
   const { state } = React.useContext(UserContext)
   React.useEffect(() => {
      ;(async () => {
         try {
            const response = await fetch(
               `/menu/${state.viewingRestaurant}/${params.id}`
            )
            const { data } = await response.json()
            setMenu(data.menu)
         } catch (error) {
            console.log(error.message)
         }
      })()
   }, [params.id, state.viewingMenu])
   return (
      <Layout>
         <Menu toggleTunnel={toggleTunnel} menu={menu} />
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
      </Layout>
   )
}

export default Restaurant
