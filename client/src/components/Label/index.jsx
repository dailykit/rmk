import React from 'react'

const Label = ({ htmlFor, children }) => {
   return (
      <label
         className="text-sm uppercase tracking-wider font-medium text-teal-700"
         htmlFor={htmlFor}
      >
         {children}
      </label>
   )
}

export default Label
