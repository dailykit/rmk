import React from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Input, Button } from '../components'
import { toast } from 'react-toastify'
import { UserContext } from '../context/User'

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
      default:
         return state
   }
}

const Login = () => {
   const history = useHistory()
   const { dispatch: action } = React.useContext(UserContext)
   const [isLoading, setIsLoading] = React.useState(false)
   const [state, dispatch] = React.useReducer(reducer, {
      email: '',
      password: '',
   })

   const submit = async e => {
      try {
         e.preventDefault()
         setIsLoading(true)
         const response = await fetch(
            `${process.env.REACT_APP_DAILYKEY}/users/login`,
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
            action({
               type: 'LOGIN',
               payload: { value: { id: res.data.id, name: res.data.name } },
            })
            console.log(res.data)
            toast.success('Logged in successfully!')
            if (res.data.redirect) history.push('/address')
            else history.push('/menu')
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
               Don't have an account?{' '}
               <Link to="/onboarding">
                  <span className="text-primary">SIGN UP</span>
               </Link>
            </div>
            <h1 className="text-gray-700 text-4xl font-bold mb-16">Login</h1>
            <div className="w-3/4">
               {/* Stage 1 */}
               <form onSubmit={submit}>
                  <div className="mb-4">
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
                        required
                     />
                  </div>
                  <Button disabled={isLoading}>
                     {isLoading ? 'AUTHENTICATING...' : 'LOGIN'}
                  </Button>
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

export default Login
