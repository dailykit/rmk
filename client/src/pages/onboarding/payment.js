import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import { Button, CardSection } from '../../components'
import { toast } from 'react-toastify'
import { UserContext } from '../../context/User'

const Payment = () => {
   const history = useHistory()
   const stripe = useStripe()
   const elements = useElements()
   const { state: global, dispatch: action } = React.useContext(UserContext)
   const [isLoading, setIsLoading] = React.useState(false)
   const [secret, setSecret] = React.useState('')

   const createIntent = async () => {
      try {
         const response = await fetch(
            `${process.env.REACT_APP_DAILYKEY}/users/payment-intent`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({ id: global.id }),
            }
         )
         const res = await response.json()
         if (res.success) {
            console.log(res)
            setSecret(res.data.secret)
         } else {
            throw Error(res.message)
         }
      } catch (err) {
         toast.error(err.message)
      }
   }

   React.useEffect(() => {
      createIntent()
   }, [])

   const submit = async e => {
      try {
         e.preventDefault()
         if (!stripe || !elements) {
            return
         }
         setIsLoading(true)
         const result = await stripe.confirmCardSetup(secret, {
            payment_method: {
               card: elements.getElement(CardElement),
               billing_details: {
                  name: global.name,
               },
            },
         })
         if (result.error) {
            setIsLoading(false)
            throw result.error
         } else {
            console.log('MeTHOd: ', result.setupIntent.payment_method)
            const data = {
               payment_method: result.setupIntent.payment_method,
               id: global.id,
            }
            const response = await fetch('/users/save-card', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
            })
            const res = await response.json()
            if (res.success) {
               toast.success('Card saved!')
               history.push('/menu')
            } else {
               throw Error(res.message)
            }
         }
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div className="flex h-screen">
         <div className="bg-onboarding bg-cover flex-1"></div>
         <div className="flex-1 relative p-8">
            <h1 className="text-gray-700 text-4xl font-bold mb-16">
               Add card details
            </h1>
            <div className="w-3/4">
               {/* Stage 3 */}
               <form onSubmit={submit}>
                  <CardSection />
                  <Button disabled={!stripe || isLoading}>
                     {isLoading ? 'Saving...' : 'Save Card'}
                  </Button>
               </form>
            </div>
         </div>
         <style>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
            .StripeElement {
               height: 40px;
               padding: 10px 12px;
               margin-bottom: 3rem;
               width: 100%;
               color: #32325d;
               background-color: white;
               border: 1px solid transparent;
               border-radius: 4px;
             
               box-shadow: 0 1px 3px 0 #e6ebf1;
               -webkit-transition: box-shadow 150ms ease;
               transition: box-shadow 150ms ease;
             }
             
             .StripeElement--focus {
               box-shadow: 0 1px 3px 0 #cfd7df;
             }
             
             .StripeElement--invalid {
               border-color: red;
             }
             
             .StripeElement--webkit-autofill {
               background-color: #fefde5 !important;
             }
         `}</style>
      </div>
   )
}

export default Payment
