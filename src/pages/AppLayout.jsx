import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../features/sidebar/SideBar";

function AppLayout() {
  return (
    <>
      <div className="relative">
        <Header />
        <SideBar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
export default AppLayout;
