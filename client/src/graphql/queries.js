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
               brandName
               description
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
         brandName
         description
         organization {
            datahubUrl
         }
      }
   }
`

export const CUSTOMER = gql`
   query customer($keycloakId: String!) {
      customer: platform_customer(keycloakId: $keycloakId) {
         email
         firstName
         lastName
         keycloakId
         defaultCustomerAddressId
         defaultPaymentMethodId
         defaultCustomerAddress {
            zipcode
         }
      }
   }
`

export const ADDRESSES = gql`
   query addresses($keycloakId: String!) {
      addresses: platform_customerAddresses(
         where: { keycloakId: { _eq: $keycloakId } }
      ) {
         id
         line1
         line2
         city
         state
         country
         zipcode
         defaultAddress {
            defaultCustomerAddressId
         }
      }
   }
`

export const COMBO_PRODUCTS = `
   query comboProducts($_in: [Int!]!) {
      comboProducts(where: { id: { _in: $_in } }) {
         id
         name
         comboProductComponents {
            id
            label
            customizableProduct {
               id
               default
               customizableProductOptions {
                  id
                  simpleRecipeProduct {
                     id
                     simpleRecipe {
                        id
                        name
                        assets
                     }
                  }
               }
            }
         }
      }
   }
`

export const RECIPE = `
   query simpleRecipeProduct($id: Int!) {
      simpleRecipeProduct(id: $id) {
         simpleRecipe {
            id
            name
            author
            cookingTime
            cuisine
            description
            procedures
            image
            assets
            simpleRecipeYields(
               where: { yield: { _contains: { serving: "4" } } }
            ) {
               id
               yield
               ingredientSachets {
                  isVisible
                  slipName
                  ingredientSachet {
                     id
                  }
               }
            }
         }
      }
   }
`
