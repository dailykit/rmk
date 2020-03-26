import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Input, Button } from '../../components'
import { toast } from 'react-toastify'
import { UserContext } from '../../context/User'

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
   const { dispatch: action } = React.useContext(UserContext)
   const [isLoading, setIsLoading] = React.useState(false)
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
            `${process.env.REACT_APP_DAILYKEY}/users/signup`,
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
            action({ type: 'SIGNUP', payload: { value: res.data } })
            toast.success('Signed up successfully!')
            history.push('/address')
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
            <div className="progress transition-all duration-200 ease-linear h-2 bg-primary absolute top-0 left-0"></div>
            <div className="text-right mb-8">
               Already have an account?{' '}
               <Link to="/login">
                  <span className="text-primary">LOGIN</span>
               </Link>
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
                        validate={true}
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
                  <Button disabled={isLoading}>
                     {isLoading
                        ? 'CREATING ACCOUNT FOR YOUR HUNGER...'
                        : 'GET STARTED'}
                  </Button>
               </form>
            </div>
         </div>
         <style jsx>{`
            .bg-onboarding {
               background-image: url('/img/index-hero.jpg');
            }
            .progress {
               width: 50%;
            }
         `}</style>
      </div>
   )
}

export default Home
