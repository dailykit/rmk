import gql from 'graphql-tag'

export const UPDATE_CUSTOMER = gql`
   mutation updateCustomer(
      $keycloakId: String!
      $_set: platform_customer_set_input!
   ) {
      updateCustomer: platform_updateCustomer(
         _set: $_set
         pk_columns: { keycloakId: $keycloakId }
      ) {
         defaultCustomerAddressId
      }
   }
`
