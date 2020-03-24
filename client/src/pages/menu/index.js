import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../sections'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { DatePicker } from '../../components'

import { Cart, Restaurant, RecipeDetails } from '../../sections'

const GET_MENU = gql`
   query {
      menus {
         name
         menuCollections {
            menuCollection {
               name
               categories {
                  title
                  products {
                     name
                     items {
                        label
                        recipes {
                           recipe {
                              name
                              servings {
                                 size
                                 ingredients {
                                    ingredient {
                                       name
                                    }
                                    processing {
                                       processingName {
                                          name
                                       }
                                       sachets {
                                          quantity {
                                             value
                                          }
                                       }
                                    }
                                    sachet {
                                       quantity {
                                          value
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
            availability
         }
      }
   }
`

const Home = () => {
   const [tunnel, toggleTunnel] = React.useState(false)
   return (
      <Layout>
         <div className="jumbotron bg-center bg-no-repeat bg-cover h-64 flex items-center pl-16">
            <h1 className="text-white text-4xl font-light">
               Your local restaurants are now serving Meal Kits
            </h1>
         </div>
         <h2 className="font-medium tracking-wider uppercase text-gray-500 pb-2 pt-4 pl-4 text-sm">
            Hungerboard
         </h2>
         <DatePicker getSelectedDay={day => console.log(day)} />
         <div className="wrapper p-6">
            <div>
               <Restaurant toggleTunnel={toggleTunnel} />
            </div>
            <div>
               <Cart />
            </div>
         </div>
         {tunnel && <RecipeDetails toggleTunnel={toggleTunnel} />}
         <style jsx>
            {`
               .jumbotron {
                  background-image: url('/img/menu-hero.jpg');
               }
               .wrapper {
                  display: grid;
                  grid-template-columns: 1fr 360px;
                  grid-gap: 20px;
               }
            `}
         </style>
      </Layout>
   )
}

export default Home
