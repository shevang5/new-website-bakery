import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Blog from '../components/Blog'
import Reviews from '../components/Reviews'
import CTA from '../components/CTA'
import Team from '../components/Team'
import Contact from '../components/Contact'
import FAQs from '../components/FAQs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/> 
      <About/>
      <Blog/>
      <Reviews/>
      <CTA/>
      <Team/>
      <Contact/>
      <FAQs/>
      <Footer/>
    </div> 
  )
}

export default Home
