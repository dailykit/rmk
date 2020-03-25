import React from 'react'
import { Layout } from '../../sections'

import { Restaurant, RecipeDetails } from '../../sections'

const Home = () => {
   const [tunnel, toggleTunnel] = React.useState(false)
   return (
      <Layout>
         <Restaurant toggleTunnel={toggleTunnel} />
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
      </Layout>
   )
}

export default Home
