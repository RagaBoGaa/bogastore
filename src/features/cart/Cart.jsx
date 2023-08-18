import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getAllCart,
  removeFromCart,
  toggleQuantity,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { cartPng } from "../../utils/imgs";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getAllCart);

  const { itemsCount, totalAmount } = useSelector((state) => state.cart);

  if (cart.length === 0) {
    return (
      <div className="my-5">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <img
            className="mb-4 w-[120px]"
            src={cartPng}
            alt="an image for a shopping cart"
          />
          <span className=" text-gray-500">Your shopping cart is empty.</span>
          <Link
            to="/"
            className="fw-5 mt-6 border border-red-400 bg-red-400 px-11 py-3 text-white transition-colors duration-300 ease-in-out hover:bg-transparent hover:text-red-400"
          >
            Go shopping Now
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-[85vh] overflow-x-hidden bg-white   pt-8 text-sm">
      <div>
        <div className=" mx-auto max-w-6xl  px-2.5 py-[2px] capitalize ">
          <div className="mb-8 rounded-sm  bg-white  text-black/60 shadow-md">
            <div className="hidden min-h-[4px] grid-cols-[repeat(auto-fit,minmax(50px,1fr))] items-center border border-b-stone-50 px-8 text-xs sm:grid sm:text-sm">
              <div>
                <span>#</span>
              </div>
              <div>
                <span>Image</span>
              </div>
              <div>
                <span>Product</span>
              </div>
              <div>
                <span>Unit Price</span>
              </div>
              <div>
                <span>Quantity</span>
              </div>
              <div>
                <span>Total Price</span>
              </div>
              <div>
                <span>Actions</span>
              </div>
            </div>
          </div>

          <div className="rounded-sm  bg-white px-8 text-black/60 shadow-md">
            {cart.map((cart, index) => {
              return (
                <div
                  className="grid min-h-[4px] grid-cols-[repeat(auto-fit,minmax(100px,1fr))] items-center border border-l-0 border-r-0 border-t-0 border-b-stone-200 py-4"
                  key={cart?.id}
                >
                  <div>
                    <span>{index + 1}</span>
                  </div>
                  <div>
                    <span>
                      <img
                        className=" max-h-[69px] max-w-[60px]"
                        src={cart.images[0]}
                        alt={cart.title}
                      />
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm">{cart?.title}</span>
                  </div>
                  <div>
                    <span>{formatCurrency(cart?.discountPrice)}</span>
                  </div>
                  <div>
                    <div className=" flex items-center">
                      <button
                        type="button"
                        className="flex h-[28px] w-[28px] items-center justify-center border border-black/10 "
                        onClick={() =>
                          dispatch(
                            toggleQuantity({ id: cart?.id, type: "dec" }),
                          )
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <div className="flex h-[28px] w-[36px] items-center justify-center border border-y-black/10">
                        {cart?.quantity}
                      </div>

                      <button
                        type="button"
                        className="flex h-[28px] w-[28px] items-center justify-center border border-black/10 text-sm"
                        onClick={() =>
                          dispatch(
                            toggleQuantity({ id: cart?.id, type: "inc" }),
                          )
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className=" text-red-400">
                      {formatCurrency(cart?.totalPrice)}
                    </span>
                  </div>

                  <div>
                    <button
                      type="button"
                      className="mt-2 rounded-sm bg-red-400 px-4 py-2 text-sm text-white transition-colors duration-300 hover:bg-red-500 sm:mt-0"
                      onClick={() => dispatch(removeFromCart(cart?.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mb-4 mt-8 flex items-start justify-between bg-white sm:px-8 sm:py-3">
            <div className="self-end ">
              <button
                type="button"
                className="rounded-sm border border-red-500 px-2 py-[1px] text-xs uppercase transition-colors duration-300 hover:bg-red-500 hover:text-white sm:px-4 sm:py-3 sm:text-sm"
                onClick={() => dispatch(clearCart())}
              >
                <i className="fas fa-trash"></i>
                <span className="mx-1">Clear Cart</span>
              </button>
            </div>

            <div className="flex flex-col ">
              <div className="-mr-4 flex items-center ">
                <div className="text-xs sm:text-sm">
                  Total ({itemsCount}) items:{" "}
                </div>
                <span className="mx-2  text-red-400">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <button
                type="button"
                className="mt-3 rounded-sm bg-red-400 text-white sm:px-11 sm:py-3"
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
