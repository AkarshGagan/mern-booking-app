import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[hsl(46,100%,78%)] to-[#f7e491]">
      <Header></Header>
      <Hero />
      <div className="conatiner mx-auto">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
