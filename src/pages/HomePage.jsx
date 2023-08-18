import Carousel from "../components/Carousel";
import ProductsList from "../features/products/ProductsList";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  getAllProducts,
  getProductsStatus,
} from "../features/products/productsSlice";
import { useEffect } from "react";
import Loader from "../components/Loader";
import { getAllCategories } from "../features/category/categorySlice";

function HomePage() {
  const dispatch = useDispatch();
  const products = useSelector(getAllProducts);
  const productsStatus = useSelector(getProductsStatus);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchProducts(50));
  }, [dispatch]);

  let laptops = products.filter(
    (product) => product.category === categories[1],
  );
  let fragrances = products.filter(
    (product) => product.category === categories[2],
  );

  let skincare = products.filter(
    (product) => product.category === categories[3],
  );

  let tops = products.filter((product) => product.category === categories[7]);

  // Get random products
  function shuffleArray(array) {
    const shuffledArray = [...array]; // Create a shallow copy of the input array

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements at randomIndex and i
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temp;
    }

    return shuffledArray;
  }

  const randomProducts = shuffleArray(products);

  return (
    <main>
      <section className="mx-auto px-2.5">
        <Carousel />
      </section>

      <section className="mx-auto bg-stone-100 px-2.5">
        <div className="mx-auto mt-5  max-w-6xl">
          <div className="py-5">
            <div className="mt-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
              <h3 className="font-semibold uppercase text-stone-500">
                see our products
              </h3>
            </div>
          </div>
          {productsStatus === "loading" ? (
            <Loader />
          ) : (
            <ProductsList products={randomProducts} />
          )}

          <div className=" py-5">
            <div className="mb-5 mt-7 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
              <h3 className="font-semibold uppercase text-stone-500">
                {categories[2]}
              </h3>
            </div>
            {productsStatus === "loading" ? (
              <Loader />
            ) : (
              <ProductsList products={fragrances} />
            )}
          </div>

          <div className=" py-5">
            <div className="mb-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
              <h3 className="font-semibold uppercase text-stone-500">
                {categories[1]}
              </h3>
            </div>
            {productsStatus === "loading" ? (
              <Loader />
            ) : (
              <ProductsList products={laptops} />
            )}
          </div>

          <div className="py-5">
            <div className="mb-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
              <h3 className="font-semibold uppercase text-stone-500">
                {categories[3]}
              </h3>
            </div>
            {productsStatus === "loading" ? (
              <Loader />
            ) : (
              <ProductsList products={skincare} />
            )}
          </div>

          <div className="py-5">
            <div className="mb-5 border-l-4 border-red-400 bg-white py-2 pl-4 shadow-sm">
              <h3 className="font-semibold uppercase text-stone-500">
                {categories[7]}
              </h3>
            </div>
            {productsStatus === "loading" ? (
              <Loader />
            ) : (
              <ProductsList products={tops} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
export default HomePage;
