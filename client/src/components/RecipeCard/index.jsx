import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe }) => {
   const { title, url, thumb } = recipe
   return (
      <li className=" bg-white p-2 rounded overflow-hidden border border-gray-300">
         <div className="mb-2 rounded overflow-hidden">
            <img className="w-full" src={thumb} alt={title} />
         </div>
         <Link to={url}>{title}</Link>
      </li>
   )
}

export default RecipeCard
