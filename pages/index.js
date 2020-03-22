import Router from "next/router";

import { UserContext } from "../context/User";
import { Button } from "../components";

const Home = () => {
  const { dispatch } = React.useContext(UserContext);
  const [zip, setZip] = React.useState("");

  const submit = e => {
    e.preventDefault();
    dispatch({ type: "ZIP", payload: { value: zip } });
    Router.push("/menu");
  };

  return (
    <React.Fragment>
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
          <form onSubmit={submit}>
            <div className="flex">
              <input
                type="text"
                placeholder="Enter your zip code"
                name="zip"
                className="p-2"
                value={zip}
                onChange={e => setZip(e.target.value)}
                pattern="(\d{5}([\-]\d{4})?)"
                title="Format: nnnnn or nnnnn-nnnn"
                required
              />
              <Button>GET STARTED</Button>
            </div>
          </form>
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
    </React.Fragment>
  );
};

export default Home;
