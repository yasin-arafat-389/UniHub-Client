import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Utilities/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
