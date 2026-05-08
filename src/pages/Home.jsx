import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Trending from "../components/Trending";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setWishlist } from "../redux/slices/whishlistSlice";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "../services/wishlistService";

function Home() {

  return (
    <div>
      <Navbar />
      <Hero />
      <Category />
      <Trending />
      <Footer />
    </div>
  );
}

export default Home;