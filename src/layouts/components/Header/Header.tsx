import { Link } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import path from '../../../constants/path'
import { useState, useRef, useEffect } from 'react'
import LoginModal from '../../../components/LoginModal/LoginModal'

export default function Header() {
  const { user, isAuthenticated } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Xử lý click outside để đóng dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = path.home
  }

  return (
    <>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo và menu bên trái */}
            <div className='flex items-center'>
              <Link to={path.home} className='text-xl font-bold text-gray-800 hover:text-gray-600'>
                Kid Programming
              </Link>
              <nav className='ml-10 flex space-x-4'>
                <Link to={path.home} className='text-gray-600 hover:text-gray-900 transition-colors'>
                  Trang chủ
                </Link>
                <Link to='/course-list' className='text-gray-600 hover:text-gray-900 transition-colors'>
                  Khóa học
                </Link>
              </nav>
            </div>

            {/* Menu bên phải */}
            <div className='flex items-center'>
              {isAuthenticated && user ? (
                <div className='flex items-center space-x-4'>
                  <span className='text-gray-600'>Xin chào, {user.fullName}</span>
                  <div className='relative' ref={dropdownRef}>
                    <button
                      className='flex items-center space-x-2 text-gray-600 hover:text-gray-900'
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <img
                        src={user.avatarUrl || '/default-avatar.png'}
                        alt='Avatar'
                        className='w-8 h-8 rounded-full object-cover'
                      />
                      <span className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {/* Dropdown menu với animation */}
                    <div
                      className={`
                        absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50
                        transition-all duration-200 ease-in-out origin-top-right
                        ${isDropdownOpen ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}
                      `}
                    >
                      <Link
                        to={path.profile}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Thông tin cá nhân
                      </Link>
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false)
                          handleLogout()
                        }}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
