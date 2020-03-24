import React from 'react'

import { RecipeCard } from '../../components'

const Section = ({ type, count, recipes: rec, toggleTunnel }) => {
   const [recipes] = React.useState([
      {
         title: 'Chicken Salad',
         url: 'menu/chicken',
         thumb:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
      },
      {
         title: 'Chicken Salad',
         url: 'menu/salad',
         thumb:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
      },
      {
         title: 'Chicken Salad',
         url: 'menu/curry',
         thumb:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
      },
      {
         title: 'Chicken Salad',
         url: '#',
         thumb:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
      },
      {
         title: 'Chicken Salad',
         url: '#',
         thumb:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
      },
   ])
   return (
      <div className="mt-4 bg-gray-200 px-4 pb-3">
         <span
            className={`inline-block mb-2 ${
               type.toLowerCase() === 'dinner' ? 'bg-blue-900' : 'bg-orange-400'
            } px-2 py-1 text-white text-sm`}
         >
            {type}: Serves 4 people
         </span>
         <header className="mb-2 flex items-center ">
            <span className="text-gray-600">{count} recipes available:</span>
         </header>
         <ul className="grid grid-cols-3 col-gap-3 overflow-x-auto">
            {recipes.slice(0, 4).map((recipe, index) => (
               <RecipeCard
                  key={index}
                  recipe={recipe}
                  toggleTunnel={toggleTunnel}
               />
            ))}
         </ul>
      </div>
   )
}

export default Section
