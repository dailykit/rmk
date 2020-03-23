const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const defaultOptions = {
   required: true,
}

export const validator = (type, value, options = defaultOptions) => {
   switch (type) {
      case 'EMAIL':
         if (options.required && !value.length) {
            return 'Email is required!'
         } else {
            if (email.test(value.toLowerCase())) return null
            else return 'Email invalid!'
         }
      case 'PASSWORD':
         if (options.required && !value.length) {
            return 'Password is required!'
         } else {
            if (value.length < 8) {
               return 'Password should be at least 8 characters long!'
            } else {
               return null
            }
         }
   }
}
