import { Link } from "react-router-dom";
import { redBg } from "../utils/styles";

function Footer() {
  return (
    <footer className={`${redBg} text-xs text-white sm:text-sm`}>
      <div className="py mx-auto max-w-6xl  px-2.5 py-2 text-center">
        <div className="flex items-center justify-between border-b-2 border-red-100/20 pb-2 text-sm font-semibold">
          <Link className="text-xs uppercase sm:text-sm" to="/">
            About BogaStore.
          </Link>
          <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>
          <Link className="text-xs uppercase sm:text-sm" to="/">
            terms of services
          </Link>
          <span className="h-[16px] w-[1px] border-x border-red-100/20"></span>
          <Link className="text-xs uppercase sm:text-sm" to="/">
            privacy policy
          </Link>
        </div>
        <span className="mt-2 block">
          &copy; {new Date().getFullYear()} BogaStore.🎔 All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
