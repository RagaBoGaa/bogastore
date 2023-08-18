import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  getSingleProduct,
  getSingleProductStatus,
} from "./productsSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { formatCurrency } from "../../utils/helpers";
import {
  addToCart,
  cartMessageOff,
  cartMessageOn,
  getCartMessageStatus,
} from "../cart/cartSlice";
import CartMessage from "../cart/CartMessage";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getSingleProduct);
  const productStatus = useSelector(getSingleProductStatus);
  const [quantity, setQuantity] = useState(1);
  const cartMessage = useSelector(getCartMessageStatus);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (cartMessage) {
      const timerId = setTimeout(() => {
        dispatch(cartMessageOff());
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [cartMessage, dispatch]);

  const increaseQuant = function () {
    setQuantity((current) => {
      let newQuant = current + 1;
      if (newQuant > product?.stock) newQuant = product?.stock;
      return newQuant;
    });
  };

  const decreaseQuant = function () {
    setQuantity((current) => {
      let newQuant = current - 1;
      if (newQuant < 1) newQuant = 1;
      return newQuant;
    });
  };

  function handleAddToCart(product) {
    const discountPrice =
      product?.price - product?.price * (product?.discountPercentage / 100);
    const totalPrice = quantity * discountPrice;

    dispatch(
      addToCart({ ...product, quantity: quantity, discountPrice, totalPrice }),
    );
    dispatch(cartMessageOn());
  }

  const discount =
    product?.price - product?.price * (product?.discountPercentage / 100);
  if (productStatus === "loading") return <Loader />;

  return (
    <main className=" bg-stone-100 py-5 text-sm sm:text-base ">
      <div className="mx-auto max-w-6xl gap-8 p-2">
        <div className="">
          <div className=" grid  gap-8  bg-white p-2 md:grid-cols-2">
            <div className="product-single-l mt-5 ">
              <div className="product-img ">
                <div className="h-[380px] overflow-hidden ">
                  <img
                    src={
                      product ? (product.images ? product.images[0] : "") : ""
                    }
                    alt={product.ti}
                    className="transition-all ease-in-out"
                  />
                </div>

                <div className="my-2 flex items-center overflow-x-hidden border-b-4 border-stone-200/30">
                  <div className="mx-1 h-28 border-2 border-white transition-all ease-in-out">
                    <img
                      src={
                        product ? (product.images ? product.images[1] : "") : ""
                      }
                      alt={product.ti}
                      className="h-full w-full object-cover transition-all ease-in-out"
                    />
                  </div>
                  <div className="mx-1 h-28 border-2 border-white transition-all ease-in-out">
                    <img
                      src={
                        product ? (product.images ? product.images[2] : "") : ""
                      }
                      alt=""
                      className="h-full w-full object-cover transition-all ease-in-out"
                    />
                  </div>
                  <div className="mx-1 h-28 border-2 border-white transition-all ease-in-out">
                    <img
                      src={
                        product
                          ? product.images
                            ? product?.images[3]
                            : ""
                          : ""
                      }
                      alt={product.ti}
                      className="h-full w-full object-cover transition-all ease-in-out"
                    />
                  </div>
                  <div className="mx-1 h-28 border-2 border-white transition-all ease-in-out">
                    <img
                      src={
                        product ? (product.images ? product.images[4] : "") : ""
                      }
                      alt={product.ti}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 ">
              <div className="product-details ">
                <div className=" pb-2 text-xl font-bold capitalize">
                  {product?.title}
                </div>
                <div>
                  <p className="opacity-90">{product?.description}</p>
                </div>
                <div className="mb-6 mt-4 flex  flex-wrap items-center">
                  <div className="rating">
                    <span className="font-semibold text-red-400">Rating:</span>
                    <span className="mx-1">
                      {product?.rating} ⭐{" "}
                      <span className="text-red-600/60">|</span>
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-red-400">Brand:</span>
                    <span className="mx-1">
                      {product?.brand}{" "}
                      <span className="text-red-600/60">|</span>{" "}
                    </span>
                  </div>

                  <div>
                    <span className="font-semibold text-red-400">
                      Category:
                    </span>
                    <span className="mx-1 capitalize">
                      {product?.category
                        ? product.category.replace("-", " ")
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="bg-stone-100 p-8">
                  <div className="flex items-center">
                    <div className="text-stone-600 line-through">
                      {formatCurrency(product?.price)}
                    </div>
                    <span className=" mx-2 text-black/50">
                      Inclusive of all taxes
                    </span>
                  </div>

                  <div className="my-1 flex items-center">
                    <div className=" text-red-400">
                      {formatCurrency(discount)}
                    </div>
                    <div className="ml-2 mt-1 rounded-md bg-red-400 px-3 text-white">
                      {product?.discountPercentage}% OFF
                    </div>
                  </div>
                </div>

                <div className="qty my-4 flex items-center">
                  <div className="qty-text">Quantity:</div>
                  <div className="qty-change mx-3 flex items-center">
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center  border border-black/10 text-sm"
                      onClick={() => decreaseQuant()}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <div className="flex h-7 w-11 items-center justify-center border-y border-black/10">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center border border-black/10 "
                      onClick={() => increaseQuant()}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div>
                    <span className="font-semibold text-red-400">
                      Available pieces:
                    </span>
                    <span className="mx-1">{product?.stock}</span>
                  </div>
                  {product?.stock === 0 ? (
                    <div className="qty-error text-uppercase bg-danger fs-12 ls-1 fw-5 mx-2 text-white">
                      out of stock
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns">
                  <button
                    type="button"
                    className=" h-12 border border-red-400 bg-red-200/30 px-7 text-red-400 transition-all duration-300  ease-in-out hover:bg-red-400 hover:text-white hover:opacity-90"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="mx-2 capitalize">add to cart</span>
                  </button>
                  <button
                    type="button"
                    className="mx-3 h-12 border border-red-400 bg-red-400 px-7 text-white transition-all duration-300 ease-in-out hover:opacity-90"
                  >
                    <span className="btn-text">buy now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cartMessage && <CartMessage quantity={quantity} />}
    </main>
  );
}
export default ProductPage;
