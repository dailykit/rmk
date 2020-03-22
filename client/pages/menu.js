import { Layout } from '../sections'

const Home = () => {
   return (
      <Layout>
         <div className="jumbotron bg-bottom bg-cover h-64 p-16 flex">
            <h1 className="text-2xl text-white font-semibold self-end">
               Your local restaurants are now serving Meal Kits
            </h1>
         </div>
         <style jsx>
            {`
               .jumbotron {
                  background-image: url('/img/menu-hero.jpg');
               }
            `}
         </style>
      </Layout>
   )
}

export default Home
