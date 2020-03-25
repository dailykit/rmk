import React from 'react'
import { useHistory } from 'react-router-dom'

import { Input, Button } from '../../components'
import { toast } from 'react-toastify'
import { UserContext } from '../../context/User'

const reducer = (state, action) => {
   switch (action.type) {
      case 'LINE1':
         return {
            ...state,
            line1: action.payload.value,
         }
      case 'LINE2':
         return {
            ...state,
            line2: action.payload.value,
         }
      case 'ZIP':
         return {
            ...state,
            zip: action.payload.value,
         }
      case 'CITY':
         return {
            ...state,
            city: action.payload.value,
         }
      case 'STATE':
         return {
            ...state,
            state: action.payload.value,
         }
      case 'INSTRUCTIONS':
         return {
            ...state,
            instructions: action.payload.value,
         }
      default:
         return state
   }
}

const Address = () => {
   const history = useHistory()
   const { state: global, dispatch: action } = React.useContext(UserContext)
   const [isLoading, setIsLoading] = React.useState(false)
   const [state, dispatch] = React.useReducer(reducer, {
      line1: '',
      line2: '',
      zip: '',
      city: '',
      state: '',
      instructions: '',
   })

   const submit = async e => {
      try {
      } catch (e) {}
   }

   return (
      <div className="flex h-screen">
         <div className="bg-onboarding bg-cover flex-1"></div>
         <div className="flex-1 relative p-8">
            <div className="progress transition-all duration-200 ease-linear h-2 bg-primary absolute top-0 left-0"></div>
            <h1 className="text-gray-700 text-4xl font-bold mb-16">
               Delivery Address
            </h1>
            <div className="w-3/4">
               {/* Stage 2 */}
               <form onSubmit={submit}>
                  <div className="mb-4">
                     <Input
                        type="text"
                        placeholder="address line 1"
                        name="line1"
                        value={state.line1}
                        onChange={e =>
                           dispatch({
                              type: 'LINE1',
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
                        value={state.line2}
                        onChange={e =>
                           dispatch({
                              type: 'LINE2',
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
                              placeholder="city"
                              name="city"
                              value={state.city}
                              onChange={e =>
                                 dispatch({
                                    type: 'CITY',
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
                        <div className="w-6/12">
                           <Input
                              type="text"
                              placeholder="state"
                              name="state"
                              value={state.city}
                              onChange={e =>
                                 dispatch({
                                    type: 'STATE',
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
                     <div className="w-6/12">
                        <Input
                           type="text"
                           placeholder="zip code"
                           name="zip"
                           value={state.zip}
                           onChange={e =>
                              dispatch({
                                 type: 'ZIP',
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
                           placeholder="add delivery instructions"
                           name="instructions"
                           value={state.instructions}
                           onChange={e =>
                              dispatch({
                                 type: 'INSTRUCTIONS',
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
                  <Button disabled={isLoading}>Proceed</Button>
               </form>
            </div>
         </div>
         <style jsx>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
            .progress {
               width: 66%;
            }
         `}</style>
      </div>
   )
}

export default Address
