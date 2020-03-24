import React from 'react'

const Button = ({ children }) => {
   return (
      <button className="text-white bg-primary w-full p-2">
         {children.toUpperCase()}
      </button>
   )
}

export default Button
