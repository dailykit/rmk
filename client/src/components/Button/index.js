import React from 'react'

const Button = ({ children }) => {
   return (
      <button className="text-white bg-primary tracking-wide w-full  h-12 rounded">
         {children.toUpperCase()}
      </button>
   )
}

export default Button
