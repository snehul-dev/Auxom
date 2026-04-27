import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Category/>
      <Footer/>
    </div>
  )
}

export default Home