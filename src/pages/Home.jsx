import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Category/>
      <ProductCard/>
      <Footer/>
    </div>
  )
}

export default Home