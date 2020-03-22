import React from 'react'
import Link from 'next/link'
import { Layout } from '../sections'

const Section = ({ type, count }) => {
   const [recipes] = React.useState([
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
         <header className="mb-2 flex items-center justify-between">
            <span className="text-gray-600">{count} recipes available:</span>
            <button className="text-blue-500">View All</button>
         </header>
         <ul className="grid grid-cols-4 col-gap-3 overflow-x-auto">
            {recipes.slice(0, 4).map((recipe, index) => (
               <RecipeCard key={index} recipe={recipe} />
            ))}
         </ul>
      </div>
   )
}

const RecipeCard = ({ recipe }) => {
   const { title, url, thumb } = recipe
   return (
      <li className=" bg-white p-2 rounded overflow-hidden border border-gray-300">
         <div className="mb-2 rounded overflow-hidden">
            <img className="w-full" src={thumb} alt={title} />
         </div>
         <Link href={url}>
            <a>{title}</a>
         </Link>
      </li>
   )
}

const Restaurant = () => {
   return (
      <div className="border border-gray-300 p-4">
         <header className="flex items-center justify-between">
            <div>
               <h1 className="text-2xl">Radison Blue</h1>
               <p className="text-gray-600">
                  Select your preferred recipes for Lunch and Dinner
               </p>
            </div>
            <button className="w-auto h-12 px-3 bg-indigo-400 text-white">
               Select Plan
            </button>
         </header>
         <Section type="Lunch" count={9} />
         <Section type="Dinner" count={4} />
      </div>
   )
}

const Home = () => {
   return (
      <Layout>
         <div className="jumbotron bg-bottom bg-cover h-64 p-16 flex">
            <h1 className="text-2xl text-white font-semibold self-end">
               Your local restaurants are now serving Meal Kits
            </h1>
         </div>
         <div className="wrapper p-6">
            <div>
               <Restaurant />
            </div>
            <div></div>
         </div>
         <style jsx>
            {`
               .jumbotron {
                  background-image: url('/img/menu-hero.jpg');
               }
               .wrapper {
                  display: grid;
                  grid-template-columns: 1fr 420px;
               }
            `}
         </style>
      </Layout>
   )
}

export default Home
