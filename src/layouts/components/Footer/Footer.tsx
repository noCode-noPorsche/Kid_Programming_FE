import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className='bg-white rounded-lg shadow-sm dark:bg-gray-900'>
      <div className='w-full max-w-screen-xl mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:justify-between'>
          <div className='grid grid-cols-1 '>
            <Link to='https://flowbite.com/' className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
              <img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Flowbite Logo' />
              <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                Kid Programming Edu
              </span>
            </Link>
            <span>Elevating your learning experience with cutting-edge online education</span>
          </div>
          <div className='max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Quick Links */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <ul className='space-y-2'>
                <li><Link to='/' className='hover:underline'>Home</Link></li>
                <li><Link to='/courses' className='hover:underline'>Courses</Link></li>
                <li><Link to='/about' className='hover:underline'>About Us</Link></li>
                <li><Link to='/contact' className='hover:underline'>Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Support</h3>
              <ul className='space-y-2'>
                <li><Link to='/faq' className='hover:underline'>FAQ</Link></li>
                <li><Link to='/help' className='hover:underline'>Help Center</Link></li>
              </ul>
            </div>

            {/* Connect With Us */}
            <div>
              <h3 className='text-lg font-semibold mb-4'>Connect With Us</h3>
              <div className='flex space-x-4 mb-4'>
                <Link to='#' className='text-white hover:text-gray-400'>FaFacebook </Link>
                <Link to='#' className='text-white hover:text-gray-400'>FaInstagram</Link>
                <Link to='#' className='text-white hover:text-gray-400'>FaLinkedin</Link>
              </div>
              <Link to='/contact' className='flex items-center space-x-2 bg-white text-[#0b0b5c] px-4 py-2 rounded-md shadow-md hover:bg-gray-200'>

                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2025{' '}
          <Link to='https://flowbite.com/' className='hover:underline'>
            Kid Programming Edu™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
