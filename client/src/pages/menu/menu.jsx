import React from 'react'
import { Layout } from '../../sections'

const Recipe = () => {
   const [serving, setServing] = React.useState('MEAL_KIT')
   return (
      <Layout>
         <div className="jumbotron bg-bottom bg-cover h-64 p-16 flex">
            <h1 className="text-2xl text-white font-semibold self-end">
               Your local restaurants are now serving Meal Kits
            </h1>
         </div>
         <div className="wrapper bg-gray-200">
            <div className="p-6">
               <div className="bg-white p-4">
                  <h1 className="text-gray-800 mb-3 text-3xl font-medium">
                     Paneer curry & Rice
                  </h1>
                  <div className="w-5/6">
                     <div>
                        <img
                           className="w-full rounded"
                           src="https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg"
                           alt=""
                        />
                     </div>
                     <div className="flex mt-4">
                        <div className="w-24 h-16 mr-4 border border-gray-100 ">
                           <img
                              className="w-full h-full object-cover rounded"
                              src="https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/indian.jpg"
                              alt=""
                           />
                        </div>
                        <div className="w-24 h-16 border border-gray-100 ">
                           <img
                              className="w-full h-full object-cover rounded"
                              src="https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_610/v1/hellofresh_s3/image/5dcc139c96d0db43857c2eb3-a12c2ae7.jpg"
                              alt=""
                           />
                        </div>
                     </div>
                  </div>
                  <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                     Ingredients
                  </h2>
                  <ol className="list-decimal ml-6">
                     <li className="h-8 ">200gm chopped Potato</li>
                     <li className="h-8 ">200gm fried and sliced onion</li>
                     <li className="h-8 ">200gm chopped potato</li>
                  </ol>
                  <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                     Nutritional Values
                  </h2>
                  <table className="w-64 table-auto">
                     <tbody>
                        <tr className="border-b border-gray-300">
                           <td className="font-medium p-2">Calories:</td>
                           <td className="p-2 text-gray-600">2gm</td>
                        </tr>
                        <tr className="border-b border-gray-300">
                           <td className="font-medium p-2">Cholestrol:</td>
                           <td className="p-2 text-gray-600">1gm</td>
                        </tr>
                     </tbody>
                  </table>
                  <h2 className="pb-2 mt-4 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                     Cooking Process
                  </h2>
                  <ol className=" list-decimal ml-6">
                     <li className="h-auto mb-4">
                        Toast the buns. In a large frying pan, place the buns,
                        cut sides down, and cook over medium-high heat until
                        lightly toasted, 1 to 2 minutes. Alternatively, toast
                        them in a toaster oven. Transfer to a plate. Do not
                        clean the pan.
                     </li>
                     <li className="h-auto mb-4">
                        Make the sloppy joe filling Peel and coarsely chop the
                        onion. If using the jalapeño, remove the stem, ribs, and
                        seeds; thinly slice the jalapeño. Wash your hands after
                        handling.
                     </li>
                     <li className="h-auto mb-4">
                        Cut a small corner from the ground chicken packaging and
                        drain off any excess liquid. Transfer to a plate; pat
                        dry with a paper towel.
                     </li>
                     <li className="h-auto mb-4">
                        In the same pan used for the buns, warm 2 to 3 teaspoons
                        oil over medium-high heat until hot but not smoking. Add
                        the onion and as much jalapeño as you like, season with
                        salt and pepper, and cook, stirring occasionally, until
                        starting to soften, 2 to 3 minutes. Add the chicken,
                        season with salt and pepper, and cook, stirring to break
                        up the meat, until lightly browned but not yet cooked
                        through, 3 to 4 minutes.{' '}
                     </li>
                     <li className="h-auto mb-4">
                        Stir in the sloppy joe sauce base and ¼ cup (½ cup)
                        water and cook until the sauce is thickened slightly, 1
                        to 2 minutes. Stir in the cheddar and cook until melted
                        and the chicken is cooked through, about 1 minute.
                        Remove from the heat and season to taste with salt and
                        pepper. While the sloppy joe filling cooks, prepare the
                        salad.
                     </li>
                  </ol>
               </div>
               <div className="px-4">
                  <h3 className="text-lg uppercase font-medium text-gray-700 pb-2 border-b border-gray-300 text-gray-500 mb-3 text-lg font-medium">
                     Place Order
                  </h3>
                  <h4 className="mb-2 text-gray-600">Select Serving Type:</h4>
                  <div className="flex items-center">
                     <button
                        onClick={() => setServing('MEAL_KIT')}
                        className={`w-2/4 focus:outline-none flex items-center justify-between h-12 font-medium text-gray-700 ${
                           serving === 'MEAL_KIT'
                              ? 'bg-white pl-4'
                              : 'bg-gray-300 px-4'
                        }`}
                     >
                        Mealkit
                        {serving === 'MEAL_KIT' && (
                           <span className="h-12 w-12 flex items-center justify-center">
                              <TickIcon />
                           </span>
                        )}
                     </button>
                     <button
                        onClick={() => setServing('READY_TO_EAT')}
                        className={`w-2/4 focus:outline-none flex items-center justify-between h-12 font-medium text-gray-700 ${
                           serving === 'READY_TO_EAT'
                              ? 'bg-white pl-4'
                              : 'bg-gray-300 px-4'
                        }`}
                     >
                        Ready To Eat
                        {serving === 'READY_TO_EAT' && (
                           <span className="h-12 w-12 flex items-center justify-center">
                              <TickIcon />
                           </span>
                        )}
                     </button>
                  </div>
                  <hr className="my-4" />
                  <button className="flex items-center bg-green-500 pl-4 h-12 text-white uppercase">
                     Add to cart
                     <span className="h-12 w-12 flex items-center justify-center">
                        <PlusIcon />
                     </span>
                  </button>
               </div>
            </div>
         </div>
         <style jsx>{`
            .jumbotron {
               background-image: url('/img/menu-hero.jpg');
            }
            .wrapper > div {
               display: grid;
               width: calc(100vw - 40px);
               max-width: 1180px;
               margin: 0 auto;
               height: calc(100% - 320px);
               grid-template-columns: 1fr 420px;
            }
         `}</style>
      </Layout>
   )
}

export default Recipe

const TickIcon = ({ size = 18, color = '#53C22B' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
   </svg>
)

const PlusIcon = ({ size = 18, color = '#fff' }) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
   >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
   </svg>
)
