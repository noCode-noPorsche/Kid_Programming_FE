import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import path from '../../../../constants/path'
import http from '../../../../utils/http'
import { Chapter } from '../../Chapter/Chapter'

interface Course {
  id: string
  title: string
  description: string
  subject: string
  thumbnailUrl: string
  price: number
  status: number
  teacherName: string
  createdTime: string
  lastUpdatedTime: string
  deletedTime: string | null
}

interface ChapterData {
  id: string
  title: string
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<ChapterData[]>([])
  const navigate = useNavigate()
  const courseInfoRef = useRef<HTMLDivElement>(null)
  const courseContentRef = useRef<HTMLDivElement>(null)

  const fetchCourseDetail = async () => {
    try {
      const res = await http.get(`courses?searchById=${id}&index=1&pageSize=5`)
      console.log('📌 Chi tiết khóa học:', res.data)

      if (res.data?.data?.items && res.data.data.items.length > 0) {
        setCourse(res.data.data.items[0]) // Lấy khóa học đầu tiên vì searchById sẽ trả về 1 khóa học duy nhất
      } else {
        console.warn(`❌ Không tìm thấy khóa học có ID ${id}`)
        navigate('/course-list')
      }
    } catch (error: unknown) {
      console.error('Lỗi khi lấy chi tiết khóa học:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: unknown; status: number } }
        console.error('Server error:', axiosError.response.data)
        console.error('Status code:', axiosError.response.status)
      }
      navigate('/course-list')
    }
  }

  // Fetch danh sách chương
  const fetchChapters = async () => {
    try {
      const res = await http.get(`chapters?courseId=${id}&index=1&pageSize=10`)
      console.log('📌 Danh sách chapter:', res.data)

      if (res.data?.data?.items) {
        setChapters(res.data.data.items)
      } else {
        console.warn('❌ Không có chapter nào cho khóa học này')
      }
    } catch (error: unknown) {
      console.error('Lỗi khi lấy danh sách chapter:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: unknown; status: number } }
        console.error('Server error:', axiosError.response.data)
        console.error('Status code:', axiosError.response.status)
      }
    }
  }

  useEffect(() => {
    if (id) {
      fetchCourseDetail()
      fetchChapters()
    }
  }, [id])

  // Cuộn đến section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 50,
        behavior: 'smooth'
      })
    }
  }

  if (!course) {
    return <p className='text-center text-red-500 text-xl'>Khóa học không tồn tại.</p>
  }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>{course.title}</h1>
      <div className=' text-white p-4 flex items-center gap-4'>
        <img src='/titleiamge.jpg' alt='' />
        <h1 className='text-xl font-bold'>{course.title}</h1>
      </div>
      {course.thumbnailUrl && (
        <img src={course.thumbnailUrl} alt={course.title} className='w-full h-64 object-cover rounded-lg shadow-md' />
      )}

      {/* Thanh menu điều hướng */}
      <ul className='flex border justify-between items-center rounded-full shadow-md w-full max-w-lg mx-auto sticky top-0 bg-white z-50 mt-6'>
        <li
          className='px-5 py-3 text-gray-800 font-medium border-r hover:bg-gray-200 cursor-pointer transition-all'
          onClick={() => scrollToSection(courseInfoRef)}
        >
          COURSE INFORMATION
        </li>
        <li
          className='px-5 py-3 text-gray-800 font-medium hover:bg-gray-200 cursor-pointer transition-all'
          onClick={() => scrollToSection(courseContentRef)}
        >
          COURSE CONTENT
        </li>
        <li className='px-5 py-3 text-gray-800 font-medium border-l cursor-pointer'>🔍</li>
      </ul>

      {/* Thông tin khóa học */}
      <div ref={courseInfoRef} className='mt-8 bg-gray-50 p-6 rounded-lg shadow-sm'>
        <h2 className='text-2xl font-semibold text-blue-700 mb-3'>Course Information</h2>
        <p className='text-lg text-gray-700 mb-4'>{course.description}</p>
        <p className='text-lg text-gray-700 mb-4'>{course.subject}</p>
        <p className='text-lg text-gray-700 mb-4'>{course.teacherName}</p>
        <p className='text-lg font-semibold text-red-600 bg-red-100 p-3 rounded-md'>Price: ${course.price}</p>
        <Link
          to={path.payment}
          className='mt-4 inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all'
        >
          Buy Course
        </Link>
      </div>

      {/* Bài giảng miễn phí */}
      <div className='mt-8 bg-blue-50 p-6 rounded-lg shadow-sm'>
        <h2 className='text-2xl font-semibold text-blue-700 mb-3'>Bài giảng miễn phí</h2>
        <ul className='list-none pl-0'>
          {['Giới thiệu về Tư duy Logic', 'Các phép toán logic cơ bản', 'Giải đố vui với tư duy logic'].map(
            (lesson, index) => (
              <li
                key={index}
                className='border rounded-lg mb-3 p-4 bg-white shadow-md transition hover:bg-green-50 cursor-pointer'
              >
                <h3 className='text-lg font-medium'>{`Bài ${index + 1}: ${lesson}`}</h3>
                <p className='text-gray-700 text-sm'>Mô tả ngắn về bài học.</p>
              </li>
            )
          )}
        </ul>
      </div>

      {/* Nội dung khóa học */}
      <div ref={courseContentRef} className='mt-8 bg-gray-50 p-6 rounded-lg shadow-sm'>
        <h2 className='text-2xl font-semibold text-blue-700 mb-3'>Course Content</h2>
        <ul className='list-none pl-0'>
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <Chapter id={chapter.id} index={index} title={chapter.title} />
              </li>
                ))
          ) : (
            <p className='text-gray-500'>Không có nội dung khóa học nha.</p>
          )}
        </ul>
      </div>
    </div>
  )
}
