import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

function Home() {
  const [category, setCategory] = useState("all")

  return (
    <div>
      <Navbar />
      <Hero />
      <Category setCategory={setCategory} />
      <ProductCard category={category} setCategory = {setCategory} />

      <Footer />
    </div>
  )
}

export default Home