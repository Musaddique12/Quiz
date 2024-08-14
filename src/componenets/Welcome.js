import React from 'react'
import Hero from './Hero'
import QuizCard from './QuizCard'
import Features from './Features'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import Footer from './Footer'

const Welcome = () => {
  return (
    <div style={{backgroundColor: 'black'}}>
      <Navbar/>
      <Hero />
      <QuizCard />
      <Features />
      <Testimonials />
      <Footer/>
    </div>
  )
}

export default Welcome