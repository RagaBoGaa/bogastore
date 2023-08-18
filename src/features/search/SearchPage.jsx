import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchBySearch,
  getSearchedItems,
  getSearchedItemsStats,
} from "./searchSlice";
import ProductsList from "../products/ProductsList";
import Loader from "../../components/Loader";
import ErrorPage from "../../pages/ErrorPage";

function SearchPage() {
  const { query } = useParams();
  const dispatch = useDispatch();
  const searchedItems = useSelector(getSearchedItems);
  const searchedItemsStat = useSelector(getSearchedItemsStats);

  useEffect(() => {
    dispatch(fetchBySearch(query));
  }, [dispatch, query]);

  if (searchedItems.length === 0) return <ErrorPage />;
  return (
    <div className="mx-auto max-w-6xl px-2.5">
      <div className=" py-5">
        <div className="mb-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
          Search Result
        </div>
        {searchedItemsStat === "loading" ? (
          <Loader />
        ) : (
          <ProductsList products={searchedItems} />
        )}
      </div>
    </div>
  );
}
export default SearchPage;
