import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import { Input, Button, CardSection } from '../../components'
import { toast } from 'react-toastify'

const Payment = () => {
   const history = useHistory()
   const stripe = useStripe()
   const elements = useElements()
   const [isLoading, setIsLoading] = React.useState(false)
   const [stage, setStage] = React.useState(1)
   const [secret, setSecret] = React.useState('')
   const [id, setId] = React.useState('')

   const nextStage = async e => {
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
                  name: 's',
               },
            },
         })

         if (result.error) {
            setIsLoading(false)
            throw result.error
         } else {
            const data = {
               payment_method: result.setupIntent.payment_method,
               id,
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
               <form onSubmit={nextStage}>
                  <CardSection />
                  <Button disabled={!stripe || isLoading}>Save Card</Button>
               </form>
            </div>
         </div>
         <style jsx>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
         `}</style>
      </div>
   )
}

export default Payment
