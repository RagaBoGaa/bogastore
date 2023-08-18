/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function Product({ product }) {
  return (
    <Link key={product.id} to={`/product/${product?.id}`}>
      <div className="relative rounded-lg shadow-md transition duration-300 hover:scale-105 hover:shadow-lg">
        <div className="after:border-r-5 after:border--transparent absolute -left-1 top-7 bg-red-400 px-1 text-sm text-white shadow-sm after:absolute after:-left-1 after:top-3 after:h-0 after:w-0 after:translate-y-1 after:border-4 after:border-b-transparent after:border-l-transparent after:border-r-red-400 after:border-t-transparent">
          {product.category}
        </div>
        <div className="mb-3 h-64 overflow-hidden rounded-r-xl rounded-t-xl pb-1">
          <img className="" src={product.images[0]} alt={product.title} />
        </div>

        <div className="pb-5 pl-3 pr-3 text-center opacity-80">
          <div className="border-b border-black/5 pb-2 text-[11px]">
            <span className="mr-1">Brand: </span>
            <span className="font-bold">{product.brand}</span>
          </div>
          <div className="py-2 text-xs font-semibold tracking-wider">
            {product.title}
          </div>
          <div className="relative flex items-center justify-center after:absolute after:-bottom-2 after:h-1 after:w-14 after:bg-red-400/80">
            <span className="text-xs line-through opacity-70">
              {formatCurrency(product.price)}
            </span>
            <span className="mx-1 font-semibold">
              {formatCurrency(product.discountedPrice)}
            </span>
            <span className="text-[10px] font-semibold text-red-500/80">
              ({product.discountPercentage}% Off)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Product;
