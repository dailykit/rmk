import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Input, Button, Modal } from '../../components'
import { toast } from 'react-toastify'

import { useAuth } from '../../context/auth'

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
      default:
         return state
   }
}

const Home = () => {
   const history = useHistory()
   const [isModalVisible, setIsModalVisible] = React.useState(false)
   const [isLoading, setIsLoading] = React.useState(false)
   const { login } = useAuth()
   const [state, dispatch] = React.useReducer(reducer, {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
   })

   const submit = async e => {
      try {
         e.preventDefault()
         setIsLoading(true)
         const response = await fetch(
            `${process.env.REACT_APP_DAILYKEY}/api/users/signup`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(state),
            }
         )
         const res = await response.json()
         if (res.success) {
            setIsModalVisible(true)
            setIsLoading(false)
         } else {
            setIsLoading(false)
            throw Error(res.message)
         }
      } catch (err) {
         toast.error(err.message)
      }
   }

   return (
      <div className="flex h-screen">
         <div className="bg-onboarding bg-cover flex-1"></div>
         <div className="flex-1 relative p-8">
            <div className="text-right mb-8">
               Already have an account?{' '}
               <span className="text-primary" onClick={() => login()}>
                  LOGIN
               </span>
            </div>
            <h1 className="text-gray-700 text-4xl font-bold mb-16">Sign Up</h1>
            <div className="w-3/4">
               {/* Stage 1 */}
               <form onSubmit={submit}>
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
                           validate="true"
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
                           validate="true"
                        />
                     </div>
                     <Input
                        type="text"
                        placeholder="phone"
                        name="phone"
                        value={state.phone}
                        onChange={e =>
                           dispatch({
                              type: 'PHONE',
                              payload: { value: e.target.value },
                           })
                        }
                        required
                        validate="true"
                     />
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
                        validate="true"
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
                        minLength="6"
                        title="Must contain 6 or more characters."
                        required
                        validate="true"
                     />
                  </div>
                  <Button disabled={isLoading}>
                     {isLoading
                        ? 'CREATING ACCOUNT FOR YOUR HUNGER...'
                        : 'GET STARTED'}
                  </Button>
               </form>
            </div>
         </div>
         <Modal show={isModalVisible}>
            <div className="text-center">
               <h1 className="text-3xl text-primary font-semibold mb-4">
                  Your account has been created.
               </h1>
               <h3 className="text-lg text-gray-700 font-medium mb-8">
                  We've sent an email for verification.
                  <br />
                  You'll be able to login into your account once verfied.
               </h3>
               <Button onClick={() => login()}>Go to login</Button>
            </div>
         </Modal>
         <style jsx>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
         `}</style>
      </div>
   )
}

export default Home
