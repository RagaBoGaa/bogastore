import Product from "./Product";

/* eslint-disable react/prop-types */
function ProductsList({ products }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(218px,1fr))] gap-2 ">
      {products.map((product) => {
        let discountedPrice =
          product.price - product.price * (product.discountPercentage / 100);
        return (
          <Product key={product.id} product={{ ...product, discountedPrice }} />
        );
      })}
    </div>
  );
}
export default ProductsList;
