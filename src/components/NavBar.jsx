import { useSelector } from "react-redux";
import { getAllCategories } from "../features/category/categorySlice";
import { Link } from "react-router-dom";

function NavBar() {
  const categories = useSelector(getAllCategories);
  const newCat = categories.slice(0, 8);

  return (
    <nav className="hidden sm:block">
      <ul className="mt-2 flex flex-wrap gap-2 text-xs">
        {newCat.map((cat) => (
          <li key={cat}>
            <Link to={`/category/${cat}`}>{cat}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default NavBar;
