import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../sections'

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
         <Link to={url}>{title}</Link>
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

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
let months = [
   'Jan',
   'Feb',
   'Mar',
   'Apr',
   'May',
   'Jun',
   'Jul',
   'Aug',
   'Sep',
   'Oct',
   'Nov',
   'Dev',
]

const DateItem = ({ date, day, onClick }) => {
   return (
      <li
         className={`h-full rounded-lg flex flex-grow flex-col justify-center items center font-medium cursor-pointer text-center  ${
            new Date().getDate() === date
               ? 'bg-blue-500 text-white'
               : 'bg-white text-gray-600 hover:bg-gray-200'
         } `}
         onClick={onClick}
      >
         <span className="">{date}</span>
         <span className=" text-sm">{days[day]}</span>
      </li>
   )
}

const DatePicker = () => {
   const [month, setMonth] = React.useState(
      months[new Date().getMonth()].toLowerCase()
   )

   const days = () => {
      const days_count = new Date(
         new Date().getFullYear(),
         new Date().getMonth() + 1,
         0
      ).getDate()

      const todays_date = new Date().getDate()

      return [...Array(days_count - todays_date + 1).keys()]
         .map(i => i + todays_date)
         .slice(0, 7)
   }
   return (
      <React.Fragment>
         <div className="flex border-t border-b h-16 mb-8">
            <div className="flex justify-center items-center px-4">
               {/* <select
                  name="months"
                  id="months"
                  className="py-1"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
               >
                  <option value="jan">Jan</option>
                  <option value="feb">Feb</option>
                  <option value="mar">Mar</option>
                  <option value="apr">Apr</option>
                  <option value="may">May</option>
                  <option value="jun">Jun</option>
                  <option value="jul">Jul</option>
                  <option value="aug">Aug</option>
                  <option value="sep">Sep</option>
                  <option value="oct">Oct</option>
                  <option value="nov">Nov</option>
                  <option value="dec">Dec</option>
               </select> */}
               <span>{months[new Date().getMonth()]}</span>
            </div>
            <div className="date-selector">
               {/* <button className="px-1 bg-gray-200">
                  <ChevronLeft />
               </button> */}
               <ul className="list-none flex w-full h-full">
                  {days().map(date => (
                     <DateItem date={date} key={date} />
                  ))}
               </ul>
               {/* <button className="px-1 bg-gray-200">
                  <ChevronRight />
               </button> */}
            </div>
         </div>
         <style jsx>{`
            .date-selector {
               width: 100%;
               display: grid;
               grid-template-columns: 1fr;
            }
         `}</style>
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
         <h2 className="font-medium p-4 text-lg">Hungerboard</h2>
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

const ChevronLeft = ({ size = 24, color = '#000' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M15 18l-6-6 6-6" />
   </svg>
)

const ChevronRight = ({ size = 24, color = '#000' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M9 18l6-6-6-6" />
   </svg>
)
