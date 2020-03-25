import React from 'react'
import { useHistory } from 'react-router-dom'

import { Input, Button } from '../components'

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
      case 'ADDRESS':
         return {
            ...state,
            address: {
               ...state.address,
               [action.payload.name]: action.payload.value,
            },
         }
      case 'CARD':
         return {
            ...state,
            card: {
               ...state.card,
               [action.payload.name]: action.payload.value,
            },
         }
      default:
         return state
   }
}

const Home = () => {
   const history = useHistory()
   const [loading, setLoading] = React.useState(false)
   const [stage, setStage] = React.useState(1)
   const [state, dispatch] = React.useReducer(reducer, {
      email: '',
      password: '',
      address: {
         line1: '',
         line2: '',
         zip: '',
         city: '',
      },
      card: {
         number: '',
         expiryDate: '',
         cvv: '',
         name: '',
      },
   })

   const nextStage = async e => {
      try {
         e.preventDefault()
         if (stage !== 3) {
            setStage(stage + 1)
         } else {
            history.push('/menu')
         }
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div className="flex h-screen">
         <div className="bg-onboarding bg-cover flex-1 flex pt-48 justify-center">
            <div className="flex flex-col" style={{ width: '640px' }}>
               <p className="text-5xl text-white font-light">
                  Your{` `}
                  <span className="font-bold text-yellow-200">
                     Local Restaurants{` `}
                  </span>
                  are now serving
                  <span className="font-bold text-yellow-200"> Meal Kits</span>
               </p>
               <p className="text-xl text-gray-500 my-4">
                  Groceries Sold Out? Staring at a Lock Down? Don't fret.
                  <span className="text-yellow-200 block">
                     Restaurants near you have got your back.
                  </span>
               </p>
            </div>
         </div>
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
                     <Input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={state.email.value}
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
                        value={state.password.value}
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
                  <div className="mb-4">
                     <Input
                        type="text"
                        placeholder="Card number"
                        name="number"
                        value={state.card.number}
                        onChange={e =>
                           dispatch({
                              type: 'CARD',
                              payload: {
                                 name: e.target.name,
                                 value: e.target.value,
                              },
                           })
                        }
                        pattern="[0-9]{13,16}"
                        title="13 to 16 digit card number"
                        required
                        validate={true}
                     />
                     <div className="flex">
                        <div className="w-3/4 mr-4">
                           <Input
                              type="text"
                              placeholder="Expiry date (mm/yyyy)"
                              name="expiryDate"
                              value={state.card.expiryDate}
                              onChange={e =>
                                 dispatch({
                                    type: 'CARD',
                                    payload: {
                                       name: e.target.name,
                                       value: e.target.value,
                                    },
                                 })
                              }
                              pattern="(0[1-9]|1[012])/[0-9]{4}"
                              title="Format: mm/yyyy"
                              required
                              validate={true}
                           />
                        </div>
                        <div>
                           <Input
                              type="text"
                              placeholder="CVV"
                              name="cvv"
                              value={state.card.cvv}
                              onChange={e =>
                                 dispatch({
                                    type: 'CARD',
                                    payload: {
                                       name: e.target.name,
                                       value: e.target.value,
                                    },
                                 })
                              }
                              pattern="[0-9]{3}"
                              title="Format: nnn"
                              required
                              validate={true}
                           />
                        </div>
                     </div>
                     <Input
                        type="text"
                        placeholder="Name on card"
                        name="name"
                        value={state.card.name}
                        onChange={e =>
                           dispatch({
                              type: 'CARD',
                              payload: {
                                 name: e.target.name,
                                 value: e.target.value,
                              },
                           })
                        }
                        pattern="[A-Z]"
                        title="Uppercase letter only"
                        required
                        validate={true}
                     />
                  </div>
                  <Button>Sign Up</Button>
               </form>
            </div>
         </div>
         <style>{`
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
