import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Category from "../components/Category";
import Trending from "../components/Trending";
import Footer from "../components/Footer";

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