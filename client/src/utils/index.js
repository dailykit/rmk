import { toast } from 'react-toastify'

export const refreshToken = async token => {
   try {
      const response = await fetch(
         `${process.env.REACT_APP_DAILYKEY}/users/refresh-token`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
         }
      )
      const res = await response.json()
      if (res.success) {
         return res.data
      } else {
         throw Error(res.message)
      }
   } catch (err) {
      console.log(err)
      toast.error('Login again!')
      return null
   }
}
