import React from 'react'
import Link from 'next/link'
import { Layout } from '../sections'

const Section = ({ type, count }) => {
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

const DatePicker = () => {
   return (
      <React.Fragment>
         <div className="flex border h-16 mb-8">
            <div className="w-16 h-16 flex justify-center items-center">
               <span className="text-blue-500 font-semibold cursor-pointer">
                  Mar
               </span>
            </div>
            <ul className="list-none flex h-full">
               <li className="h-full w-16 bg-blue-500 rounded-lg flex flex-col justify-center items center font-medium cursor-pointer">
                  <span className="text-center text-white">1</span>
                  <span className="text-center text-white text-xs">Mon</span>
               </li>
               <li className="h-full w-16 rounded-lg flex flex-col justify-center items center font-medium cursor-pointer">
                  <span className="text-center">2</span>
                  <span className="text-center text-gray-500 text-xs">Tue</span>
               </li>
               <li className="h-full w-16 rounded-lg flex flex-col justify-center items center font-medium cursor-pointer">
                  <span className="text-center">3</span>
                  <span className="text-center text-gray-500 text-xs">Wed</span>
               </li>
            </ul>
         </div>
         <style jsx>{``}</style>
      </React.Fragment>
   )
}

const Cart = () => {
   return (
      <React.Fragment>
         <div className="bg-white p-2">
            <div className="title border-gray-500 text-2xl font-semibold mb-8">
               YOUR DAILY KITS
            </div>
            <div className="cart-content">
               <div className="progress border"></div>
               <div>
                  <div>
                     <h3 className="mb-4">Meals selected</h3>
                     <div className="border border-gray-300 p-4 mb-16">
                        <h2 className="mb-4 text-md font-medium">
                           Asian Restaurant name
                        </h2>
                        <div className="lunch-tile bg-white p-2 shadow font-bold mb-2">
                           English Lunch
                        </div>
                        <div className="dinner-tile bg-white p-2 shadow font-bold">
                           English Dinner
                        </div>
                     </div>
                  </div>
                  <div className="font-medium mb-16">
                     We're waiting for restaurant to confirm your order. Stay
                     put!
                  </div>
                  <div className="font-medium">
                     <small>Delivering at:</small>
                     <h3>1271, S Indiana Avenue, Chicago, Illinois, 60001</h3>
                     <span className="text-blue-500 cursor-pointer text-sm">
                        Change address
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <style jsx>{`
            .title {
               border-bottom: 1px solid #ececec;
            }
            .cart-content {
               display: grid;
               grid-template-columns: 2rem 1fr;
            }
            .lunch-tile {
               border-left: 4px solid #f6ad55;
            }
            .dinner-tile {
               border-left: 4px solid #2a4365;
            }
         `}</style>
      </React.Fragment>
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
         <h2 className="font-semibold p-4">Hungerboard</h2>
         <DatePicker />
         <div className="wrapper p-6">
            <div>
               <Restaurant />
            </div>
            <div>
               <Cart />
            </div>
         </div>
         <style jsx>
            {`
               .jumbotron {
                  background-image: url('/img/menu-hero.jpg');
               }
               .wrapper {
                  display: grid;
                  grid-template-columns: 1fr 420px;
                  grid-gap: 20px;
               }
            `}
         </style>
      </Layout>
   )
}

export default Home
