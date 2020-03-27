import React from 'react'
import { Layout } from '../sections'

import { Menu, RecipeDetails } from '../sections'

const Restaurant = () => {
   const [tunnel, toggleTunnel] = React.useState(false)
   return (
      <Layout>
         <Menu toggleTunnel={toggleTunnel} />
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
      </Layout>
   )
}

export default Restaurant
