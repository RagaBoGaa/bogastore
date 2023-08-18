import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./features/products/ProductPage";
import CategoryPage from "./features/category/CategoryPage";
import SearchPage from "./features/search/SearchPage";
import ErrorPage from "./pages/ErrorPage";
import Cart from "./features/cart/Cart";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/product/:id",
        element: <ProductPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
        errorElement: <ErrorPage />,
      },
      { path: "/search/:query", element: <SearchPage /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
