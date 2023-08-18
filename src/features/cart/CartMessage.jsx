/* eslint-disable react/prop-types */
import { correct } from "../../utils/imgs";

function CartMessage({ quantity }) {
  return (
    <div className="fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 rounded-sm bg-black/70 p-8 pb-7 pt-7 text-center">
      <div className="mb-7">
        <img
          className="mx-auto h-[45px] w-[45px]"
          src={correct}
          alt="a green image to describe success"
        />
      </div>
      <h6 className="text-sm font-semibold text-white">
        {quantity} {quantity > 1 ? "items" : "item"}{" "}
        {quantity > 1 ? "have" : "has"} been added to your shopping cart
        successfully
      </h6>
    </div>
  );
}
export default CartMessage;
