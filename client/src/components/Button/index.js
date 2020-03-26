import React from 'react'

const Button = ({ children, props }) => {
   return (
      <button
         className="text-white bg-primary tracking-wide w-full  h-12 rounded"
         {...props}
      >
         {children.toUpperCase()}
      </button>
   )
}

export default Button
