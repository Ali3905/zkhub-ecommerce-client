import Navbar from "../components/Navbar";
import Collections from "./Home/Collections";
import Hero from "./Home/Hero";
import RecentProducts from "./Home/RecentProducts";

export default function Home() {
  
  const data = [
    { title: "V-Neck T-Shirt", description: "Enbroidored Seersucker Shirt", price: 99, image: "/product1.png" },
    { title: "Cotton T-Shirt", description: "Basic Slim Fit T-Shirt", price: 99, image: "/product2.png" },
    { title: "Henley T-Shirt", description: "Blurred Print T-Shirt", price: 99, image: "/product3.png" },
    { title: "Crewneck T-Shirt", description: "Full Sleeve Zipper", price: 99, image: "/product4.png" },
    { title: "Cotton T-Shirt", description: "Basic Slim Fit T-Shirt", price: 99, image: "/product2.png" },
    { title: "Henley T-Shirt", description: "Blurred Print T-Shirt", price: 99, image: "/product3.png" },
    { title: "Cotton T-Shirt", description: "Basic Slim Fit T-Shirt", price: 99, image: "/product2.png" },
    { title: "Henley T-Shirt", description: "Blurred Print T-Shirt", price: 99, image: "/product3.png" },
    { title: "Crewneck T-Shirt", description: "Full Sleeve Zipper", price: 99, image: "/product4.png" },
  ]
  return (
    <div>
      <Navbar />
      <Hero />
      <RecentProducts products={data} />
      <Collections products={data} />
    </div>
  );
}
