import { loaderSvg } from "../utils/imgs";

function Loader() {
  return (
    <div className="container">
      <div className=" align-center flex justify-center">
        <img className=" w-20" src={loaderSvg} alt="loader image" />
      </div>
    </div>
  );
}
export default Loader;
