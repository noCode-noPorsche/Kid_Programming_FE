import { useEffect, useState } from 'react'
import CircleProcess from '../../components/CircleProcess'
import Jumbotron from '../../components/Jumbotron'
import Contact from '../Contact'
import Course from '../CourseList/Course/Course'
import Footer from '../../layouts/components/Footer'

function Home() {
  const [scrollPercentage, setScrollPercentage] = useState(0)

  const handleScroll = () => {
    const scrollY = window.scrollY
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight
    const percentage = Math.round((scrollY / documentHeight) * 100)
    setScrollPercentage(percentage)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className='h-[200vh] bg-gray-100 relative'>
      {/* <Header /> */}
      <Jumbotron />
      <section id='section1' className='min-h-screen bg-white flex items-center justify-center pb-20'>
        {/* <Introduction /> */}
        <Course />
      </section>
      <section id='section2' className='min-h-screen bg-red-100 flex items-center justify-center pb-20'>
        <Contact />
      </section>

      {/* <Footer /> */}
      <Footer />
      {scrollPercentage > 0 && (
        <div className='fixed bottom-5 right-5 flex items-center gap-2'>
          <CircleProcess
            percentage={scrollPercentage}
            onClick={scrollPercentage === 100 ? scrollToTop : undefined}
            showArrow={scrollPercentage === 100}
          />
        </div>
      )}
    </div>
  )
}

export default Home
