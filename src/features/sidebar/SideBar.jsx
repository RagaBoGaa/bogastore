import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSideBarStatus, hideSideBar } from "./sideBarSlice";
import {
  fetchCategories,
  getAllCategories,
  getAllCategoriesStatus,
} from "../category/categorySlice";
import Loader from "../../components/Loader";
import { useEffect } from "react";

function SideBar() {
  const categories = useSelector(getAllCategories);
  const categoriesStatus = useSelector(getAllCategoriesStatus);
  const isSideBarOn = useSelector(getSideBarStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <aside
      className={`${
        isSideBarOn ? "translate-x-0" : "-translate-x-full"
      } absolute inset-0 z-50 max-w-[225px] transition-all duration-300 ease-in-out`}
    >
      <div className=" bg-white  px-2 pt-3 text-stone-500">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase text-black md:text-base">
            all categories
          </h2>
          <button
            onClick={() => dispatch(hideSideBar())}
            className="transition-color font-bold  text-black duration-300 ease-in-out hover:text-red-500"
          >
            ✖
          </button>
        </div>

        <ul className="list h-minusVh divide-y-2  divide-slate-100 overflow-x-hidden overflow-y-scroll">
          {categoriesStatus === "loading" ? (
            <Loader />
          ) : (
            categories.map((category) => (
              <li
                key={category}
                className="py-2 capitalize transition-all duration-300 hover:translate-x-2 hover:text-red-400"
              >
                <Link to={`category/${category}`}>{category}</Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
export default SideBar;
