import { useEffect, useState } from 'react'
import CircleProcess from '../../components/CircleProcess'

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
      <div className='p-10'>
        <h1 className='text-3xl font-bold'>Cuộn xuống để xem Progress Circle!</h1>
        <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
      </div>

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
