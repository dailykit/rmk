import { Layout } from "../sections";

const Home = () => {
  return (
    <Layout>
      <div className="hero h-screen bg-bottom bg-cover p-40">
        <div className="w-6/12 flex flex-col">
          <p className="text-white text-lg font-semibold">
            Your <span className="text-5xl">Local Restaurants</span>
          </p>
          <p className="text-white text-lg font-semibold mb-12">
            are now serving<span className="text-6xl text-blue">Meal Kits</span>
          </p>
          <p className="bg-white text-xl text-black font-semibold p-2 mb-2">
            Groceries Sold Out? Staring at a Lock Down? Don't fret.
          </p>
          <p className="bg-black text-xl text-white font-semibold p-2 text-right mb-8">
            Restaurants near you have got you back.
          </p>
          <button className="text-white bg-blue px-6 py-2 self-end relative">
            GET STARTED
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .hero {
            background-image: url("/img/index-hero.jpg");
          }

          button::before {
            content: "";
            position: absolute;
            height: 110px;
            width: 300px;
            border: 2px solid #3fa4ff;
            border-top: none;
            border-right: none;
            top: -88px;
            left: -314px;
          }
        `}
      </style>
    </Layout>
  );
};

export default Home;
