import gql from 'graphql-tag'

export const RESTAURANTS = gql`
   query restaurants($zipcode: String!) {
      restaurants: seller_seller_zipcode_aggregate(
         where: {
            active: { _eq: true }
            zipcode: { _eq: $zipcode }
            seller: { approved: { _eq: true }, active: { _eq: true } }
         }
      ) {
         aggregate {
            count
         }
         nodes {
            seller {
               id
               logo
               description
               organization {
                  organizationName
               }
            }
         }
      }
   }
`

export const RESTAURANT = gql`
   query seller($id: uuid!) {
      seller(id: $id) {
         id
         logo
         organization {
            organizationName
         }
         description
      }
   }
`
