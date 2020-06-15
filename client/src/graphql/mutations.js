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

export const CREATE_CUSTOMER = gql`
   mutation createCustomer($object: seller_customers_insert_input!) {
      createCustomer: insert_seller_customers_one(
         object: $object
         on_conflict: { constraint: customers_pkey, update_columns: email }
      ) {
         email
         keycloakId
      }
   }
`
