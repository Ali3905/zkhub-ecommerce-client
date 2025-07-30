import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";
// import Collections from "./Home/Collections";
import Hero from "./Home/Hero";
import RecentProducts from "./Home/RecentProducts";

export default function Home() {


  return (
    <div>
      <Navbar />
      <Hero />
      <RecentProducts />
      <Footer />
    </div>
  );
}
