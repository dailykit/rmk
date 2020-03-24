import React from 'react'
import { useHistory } from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import { Input, Button, CardSection } from '../components'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
   switch (action.type) {
      case 'EMAIL':
         return {
            ...state,
            email: action.payload.value,
         }
      case 'PASSWORD':
         return {
            ...state,
            password: action.payload.value,
         }
      case 'FIRSTNAME':
         return {
            ...state,
            firstname: action.payload.value,
         }
      case 'LASTNAME':
         return {
            ...state,
            lastname: action.payload.value,
         }
      case 'PHONE':
         return {
            ...state,
            phone: action.payload.value,
         }
      case 'ADDRESS':
         return {
            ...state,
            address: {
               ...state.address,
               [action.payload.name]: action.payload.value,
            },
         }
      default:
         return state
   }
}

const Home = () => {
   const history = useHistory()
   const stripe = useStripe()
   const elements = useElements()
   const [loading, setLoading] = React.useState(false)
   const [stage, setStage] = React.useState(1)
   const [secret, setSecret] = React.useState('')
   const [state, dispatch] = React.useReducer(reducer, {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      address: {
         line1: '',
         line2: '',
         zip: '',
         city: '',
      },
   })

   const nextStage = async e => {
      try {
         e.preventDefault()
         if (stage == 1) {
            setStage(2)
         } else if (stage == 2) {
            const response = fetch('/api/users/register', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(state),
            })
            const res = await response.json()
            if (res.success) {
               toast.success('Account created')
               setSecret(res.data.client_secret)
               setStage(3)
            } else {
               throw Error(res.message)
            }
         } else {
            if (!stripe || !elements) {
               return
            }

            const result = await stripe.confirmCardSetup(secret, {
               payment_method: {
                  card: elements.getElement(CardElement),
                  billing_details: {
                     name: state.firstname + state.lastname,
                  },
               },
            })

            if (result.error) {
               throw result.error
            } else {
               const data = {
                  payment_method: result.setupIntent.payment_method,
               }
               const response = await fetch('/api/users/save-card', {
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
         }
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div className="flex h-screen">
         <div className="bg-onboarding bg-cover flex-1"></div>
         <div className="flex-1 relative p-8">
            <div className="progress transition-all duration-200 ease-linear h-2 bg-primary absolute top-0 left-0"></div>
            <div className="text-right mb-8">
               Already have an account?{' '}
               <span className="text-primary">LOGIN</span>
            </div>
            <h1 className="text-gray-700 text-4xl font-bold mb-16">Sign Up</h1>
            <div className="w-3/4">
               {/* Stage 1 */}
               <form onSubmit={nextStage} hidden={stage !== 1}>
                  <div className="mb-4">
                     <div className="flex">
                        <Input
                           type="text"
                           placeholder="firstname"
                           name="firstname"
                           value={state.firstname}
                           onChange={e =>
                              dispatch({
                                 type: 'FIRSTNAME',
                                 payload: { value: e.target.value },
                              })
                           }
                           required
                           validate={true}
                        />
                        <Input
                           type="text"
                           placeholder="lastname"
                           name="lastname"
                           value={state.lastname}
                           onChange={e =>
                              dispatch({
                                 type: 'LASTNAME',
                                 payload: { value: e.target.value },
                              })
                           }
                           required
                           validate={true}
                        />
                     </div>
                     <Input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={state.email}
                        onChange={e =>
                           dispatch({
                              type: 'EMAIL',
                              payload: { value: e.target.value },
                           })
                        }
                        required
                        validate={true}
                     />
                     <Input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={state.password}
                        onChange={e =>
                           dispatch({
                              type: 'PASSWORD',
                              payload: { value: e.target.value },
                           })
                        }
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
                        required
                        validate={true}
                     />
                  </div>
                  <Button>Get Started</Button>
               </form>
               {/* Stage 2 */}
               <form onSubmit={nextStage} hidden={stage !== 2}>
                  <div className="mb-4">
                     <Input
                        type="text"
                        placeholder="address line 1"
                        name="line1"
                        value={state.address.line1}
                        onChange={e =>
                           dispatch({
                              type: 'ADDRESS',
                              payload: {
                                 name: e.target.name,
                                 value: e.target.value,
                              },
                           })
                        }
                        required
                        validate={true}
                     />
                     <Input
                        type="text"
                        placeholder="address line 2"
                        name="line2"
                        value={state.address.line2}
                        onChange={e =>
                           dispatch({
                              type: 'ADDRESS',
                              payload: {
                                 name: e.target.name,
                                 value: e.target.value,
                              },
                           })
                        }
                     />
                     <div className="flex">
                        <div className="w-6/12 mr-4">
                           <Input
                              type="text"
                              placeholder="zip code"
                              name="zip"
                              value={state.address.zip}
                              onChange={e =>
                                 dispatch({
                                    type: 'ADDRESS',
                                    payload: {
                                       name: e.target.name,
                                       value: e.target.value,
                                    },
                                 })
                              }
                              pattern="(\d{5}([\-]\d{4})?)"
                              title="Format: nnnnn or nnnnn-nnnn"
                              required
                              validate={true}
                           />
                        </div>
                        <div className="w-full">
                           <Input
                              type="text"
                              placeholder="city"
                              name="city"
                              value={state.address.city}
                              onChange={e =>
                                 dispatch({
                                    type: 'ADDRESS',
                                    payload: {
                                       name: e.target.name,
                                       value: e.target.value,
                                    },
                                 })
                              }
                              required
                              validate={true}
                           />
                        </div>
                     </div>
                  </div>
                  <Button>Proceed</Button>
               </form>
               {/* Stage 3 */}
               <form onSubmit={nextStage} hidden={stage !== 3}>
                  <CardSection />
                  <Button disabled={!stripe}>Save Card</Button>
               </form>
            </div>
         </div>
         <style jsx>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
            .progress {
               width: ${(stage / 3) * 100}%;
            }
         `}</style>
      </div>
   )
}

export default Home
