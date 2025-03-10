import { useNavigate } from 'react-router-dom'

const courses = [
  {
    id: '1',
    title: 'Lập trình Web',
    description: 'Khóa học về React, Node.js',
    subject: 'Web Development',
    price: 500000,
    status: 1,
    teacherId: 'T1',
    createdTime: '2024-01-01',
    lastUpdatedTime: '2024-02-01',
    deletedTime: null,
    image: 'https://example.com/image.jpg',
    purchased: true
  },
  {
    id: '2',
    title: 'Python cho người mới',
    description: 'Khóa học Python cơ bản',
    subject: 'Python',
    price: 300000,
    status: 1,
    teacherId: 'T2',
    createdTime: '2024-01-10',
    lastUpdatedTime: '2024-02-05',
    deletedTime: null,
    image: 'https://example.com/python.jpg',
    purchased: true
  }
]
interface Course {
  id: string
  title: string
  description?: string
  subject: string
  price?: number
  status: number
  teacherId?: string
  createdTime: string
  lastUpdatedTime: string
  deletedTime?: string
  image: string
  purchased?: boolean
}

interface PurchasedCoursesProps {
  courses: Course[]
}

const BoughtCourses: React.FC<PurchasedCoursesProps> = ({ courses }) => {
  const navigate = useNavigate()

  return (
    <div className='container mx-auto px-4 py-6'>
      <h1 className='text-2xl font-bold mb-4'>Khóa học đã mua</h1>

      {courses.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {courses
            .filter((course) => course.purchased) // Chỉ hiển thị khóa học đã mua
            .map((course) => (
              <div
                key={course.id}
                className='bg-white border rounded-lg overflow-hidden shadow-md cursor-pointer transform transition hover:scale-105'
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className='relative'>
                  <img src={course.image} alt={course.title} className='w-full h-48 object-cover' />
                  <span className='absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded'>
                    Purchased
                  </span>
                </div>
                <div className='p-4'>
                  <h3 className='text-lg font-semibold'>{course.title}</h3>
                  <p className='text-sm text-gray-600'>{course.description}</p>
                  <p className='text-xl font-bold text-red-500 mt-2'>
                    {course.price ? `${course.price} VND` : 'Miễn phí'}
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p className='text-center text-gray-500'>Bạn chưa mua khóa học nào.</p>
      )}
    </div>
  )
}

export default BoughtCourses
