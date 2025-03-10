import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuizSection from '../QuizFun/QuizSection'
import http from '../../../utils/http'

interface Course {
  id: string
  title: string
  description: string
  subject: string
  price: number
  status: number
  teacherName: string
  createdTime: string
  lastUpdatedTime: string
  deletedTime?: string | null
  purchased?: boolean
  image?: string
}

export default function Courses() {
  const navigate = useNavigate()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await http.get('courses?index=1&pageSize=5')
      setCourses(response.data.data.items)
      // console.log(response.data.data.items)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách khóa học:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  if (loading) {
    return <p className='text-center text-blue-500 text-xl'>Đang tải danh sách khóa học...</p>
  }

  return (
    <div>
      <div className='w-full max-w-4xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>KHÓA HỌC NỔI BẬT</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className='bg-white border rounded-lg overflow-hidden shadow-md w-80 cursor-pointer cursor-pointer transform transition-transform duration-300 hover:scale-105'
              onClick={() => navigate(`/course/${course.id}`)} // Điều hướng đến CourseDetail
            >
              <div className='relative'>
                <img src={course.image} alt={course.title} className='w-full h-44 object-cover' />
                {course.purchased && (
                  <span className='absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded'>New</span>
                )}
              </div>
              <div className='p-4'>
                <h3 className='text-lg font-semibold'>{course.title}</h3>
                <p className='text-sm text-gray-600'>{course.description}</p>
                <p className='text-xl font-bold text-red-500 mt-2'>${course.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-red-500'>Không có khóa học nào.</p>
        )}
      </div>

      <div className='w-full max-w-4xl mx-auto mt-5'>
        <h2 className='text-2xl font-bold mb-4'>ĐỐ VUI</h2>
      </div>
      <div>
        <QuizSection />
      </div>
      <section className='text-center py-16 bg-white'>
        <div className='max-w-3xl mx-auto'>
          <h1 className='text-4xl font-bold text-gray-900'>Welcome to Edu Learn</h1>
          <p className='text-gray-600 mt-4 text-lg'>
            Elevate your learning experience with our premium online education platform. <br />
            Discover a world of knowledge curated by industry experts.
          </p>
        </div>

        {/* Why Choose Edu Learn Section */}
        <div className='mt-12'>
          <h2 className='text-2xl font-bold text-gray-900'>Why Choose Edu Learn?</h2>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6'>
            {/* Card 1 */}
            <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105'>
              <div className='text-indigo-600 text-4xl mb-4'>
                <i className='fas fa-bookmark'></i>
              </div>
              <h3 className='text-xl font-semibold'>Diverse Courses</h3>
              <p className='text-gray-600 text-center mt-2'>
                Explore a wide range of subjects taught by expert instructors.
              </p>
            </div>

            {/* Card 2 */}
            <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105'>
              <div className='text-indigo-600 text-4xl mb-4'>
                <i className='fas fa-rocket'></i>
              </div>
              <h3 className='text-xl font-semibold'>Learn at Your Pace</h3>
              <p className='text-gray-600 text-center mt-2'>Flexible learning schedules to fit your busy lifestyle.</p>
            </div>

            {/* Card 3 */}
            <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105'>
              <div className='text-indigo-600 text-4xl mb-4'>
                <i className='fas fa-users'></i>
              </div>
              <h3 className='text-xl font-semibold'>Community Support</h3>
              <p className='text-gray-600 text-center mt-2'>Join a vibrant community of learners and educators.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
