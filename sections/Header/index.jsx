import Link from "next/link";

import { UserContext } from "../../context/User";

const Header = () => {
  const { state } = React.useContext(UserContext);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  return (
    <nav className="bg-white h-16 w-full flex flex-row items-center px-8 fixed">
      <div className="w-32">
        <img src="/img/logo.png" alt="DailyKIT Logo" />
      </div>
      <ul className="mx-16 list-none h-full flex flex-1">
        <Link href="/">
          <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray hover:text-blue">
            Home
          </li>
        </Link>
        <Link href="/menu">
          <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray hover:text-blue">
            Menu
          </li>
        </Link>
      </ul>
      <ul className="list-none h-full flex">
        <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-blue">
          {state.zip.length > 0 ? state.zip : "Location"}
        </li>
        <li className="mx-8 h-full flex items-center cursor-pointer font-semibold text-gray hover:text-blue">
          Cart
        </li>
        <li
          className="mx-8 h-full flex items-center cursor-pointer font-semibold relative"
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          <img
            src="/img/avatar.jpg"
            className="w-10 h-10 rounded-full"
            alt="Avatar"
          />
          <ul
            className="dropdown absolute list-none bg-white z-10 shadow w-56 rounded-lg"
            hidden={!isDropdownVisible}
          >
            <li className="p-4 text-lg text-gray"> Mia Khalifa </li>
            <li className="py-2 px-4">Account</li>
            <li className="py-2 px-4">Orders</li>
            <li className="py-2 px-4">Delivery addresses</li>
            <li className="py-2 px-4">Payment Info</li>
            <li className="py-2 px-4">Settings</li>
          </ul>
        </li>
      </ul>
      <style jsx>
        {`
          .dropdown {
            top: 5rem;
            right: -2rem;
          }

          .dropdown::before {
            content: "";
            position: absolute;
            background: #fff;
            height: 1rem;
            width: 1rem;
            transform: rotate(45deg);
            right: 2.5rem;
            top: -0.5rem;
          }
        `}
      </style>
    </nav>
  );
};

export default Header;
