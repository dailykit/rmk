import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe, toggleTunnel }) => {
   const { title, thumb } = recipe
   return (
      <li
         className="cursor-pointer bg-white p-2 rounded overflow-hidden border border-gray-300"
         onClick={() => toggleTunnel(true)}
      >
         <div className="mb-2 rounded overflow-hidden">
            <img className="w-full" src={thumb} alt={title} />
         </div>
         <h4>{title}</h4>
      </li>
   )
}

export default RecipeCard
