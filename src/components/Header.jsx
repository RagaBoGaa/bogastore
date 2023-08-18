import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showSideBar } from "../features/sidebar/sideBarSlice";

//Some Styles
import { flex, redBg } from "../utils/styles";

// Components
import NavBar from "./NavBar";
import {
  getAllCart,
  getAllCartAmount,
  getCartTotal,
} from "../features/cart/cartSlice";

function Header() {
  const dispatch = useDispatch();
  const cart = useSelector(getAllCart);
  const itemsCount = useSelector(getAllCartAmount);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <header className={`${redBg} text-sm text-white `}>
      {/* Top Links */}
      <div className={`hidden sm:block`}>
        <div
          className={` ${flex} mx-auto max-w-6xl flex-col border-b-2 border-red-100/20 px-2.5 py-[2px] capitalize sm:flex sm:flex-row `}
        >
          {/* // dummy links/ */}
          <ul className={`${flex} flex-col flex-wrap space-x-2 sm:flex-row`}>
            <li>seller center</li>
            <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>

            <li className="">Download</li>
            <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>
            <li>
              <span>follow us on </span>
              <span className="space-x-2">
                <i className=" fa-brands fa-facebook"> </i>
                <i className=" fa-brands fa-instagram"></i>
              </span>
            </li>
          </ul>

          <ul className={`${flex} flex-col flex-wrap space-x-2 sm:flex-row`}>
            <li>
              <span>
                <i className="fa-regular fa-circle-question"></i>
              </span>
              <span> support</span>
            </li>
            <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>

            <li>register</li>
            <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>

            <li>login</li>
          </ul>
        </div>
      </div>
      {/* End Top Links */}

      {/* Bottom Links & Logo */}
      <div
        className={`${flex} mx-auto max-w-6xl gap-5 px-2.5 py-[2px] capitalize`}
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(showSideBar())}
            className="focus:outline-none focus:ring-2 focus:ring-red-100"
          >
            <i className="fa-solid fa-bars" style={{ color: "#ffffff" }}></i>
          </button>
          <button className=" focus:outline-none focus:ring-2 focus:ring-red-100">
            <h1 className="  text-xl">
              <i
                className="fa-solid fa-bag-shopping"
                style={{ color: "#ffffff" }}
              ></i>
              <Link to="/">
                <span className="ml-2 font-bold">Boga</span>Store.
              </Link>
            </h1>
          </button>
        </div>
        {/* End Logo */}

        {/* Search and Navbar */}
        <div className=" sm:flex sm:flex-grow sm:flex-col sm:pt-3">
          <div className="relative focus:outline-none focus:ring-2 focus:ring-red-100">
            <input
              onChange={(e) => handleSearch(e)}
              className="w-full rounded-sm px-2 py-1 text-red-400 placeholder:tracking-widest placeholder:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-100 "
              type="search"
              placeholder="Have something in your mind ?"
            />
            <Link
              to={`/search/${query}`}
              className="absolute right-0 top-0 rounded-sm bg-red-300 px-4 py-1 focus:outline-none focus:ring-2 focus:ring-red-100"
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: "#ffffff" }}
              ></i>
            </Link>
          </div>
          <NavBar />
        </div>
        {/* End Search and Navbar */}

        {/* Cart */}
        <div className="mr-2 pt-2 sm:pt-0">
          <Link to={`cart`}>
            <button className=" relative focus:outline-none focus:ring-2 focus:ring-red-100">
              <i
                className="fa-solid fa-cart-shopping"
                style={{ color: "#ffffff" }}
              ></i>
              <span className=" absolute bottom-3 left-2 inline-block h-5 w-5 rounded-full bg-stone-100 text-sm font-semibold text-red-400 	">
                {itemsCount}
              </span>
            </button>
          </Link>
        </div>
        {/* End Cart */}
      </div>
      {/* End Bottom Links & Logo */}
    </header>
  );
}
export default Header;
