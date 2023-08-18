import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchProductsByCategory,
  getAllProductsByCategory,
  getAllProductsByCategoryStatus,
} from "./categorySlice";
import { useEffect } from "react";
import ProductsList from "../products/ProductsList";
import Loader from "../../components/Loader";

function CategoryPage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const productsByCat = useSelector(getAllProductsByCategory);
  const productsByCatStat = useSelector(getAllProductsByCategoryStatus);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category));
  }, [category, dispatch]);

  return (
    <div className="mx-auto max-w-6xl px-2.5">
      <div className=" py-5">
        <div className="mb-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
          <h3 className="font-semibold uppercase text-stone-500">{category}</h3>
        </div>
        {productsByCatStat === "loading" ? (
          <Loader />
        ) : (
          <ProductsList products={productsByCat} />
        )}
      </div>
    </div>
  );
}
export default CategoryPage;
