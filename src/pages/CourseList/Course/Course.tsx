export default function Courses() {
  const courses = [
    {
      id: 1,
      title: 'Logic vui nhộn',
      price: '790.000 đ',
      description: 'Giúp bé hiểu logic và cách xâu chuỗi lại với nhau.',
      image: '/docs/images/examples/image-1@2x.jpg',
      purchased: true
    },
    {
      id: 2,
      title: 'Khoa học thú vị',
      price: '3.080.000 đ',
      description: 'Khám phá những điều kỳ diệu của khoa học theo cách dễ hiểu.',
      image: '/docs/images/examples/image-1@2x.jpg',
      purchased: true
    },
    {
      id: 3,
      title: 'Tư duy lập trình',
      price: '1.590.000 đ',
      description: 'Phát triển tư duy logic và kỹ năng lập trình cơ bản.',
      image: '/path-to-image-3.png',
      purchased: true
    }
  ]

  return (
    <div>
      <div className='w-full max-w-4xl mx-auto p-6'>
        <h2 className='text-2xl font-bold mb-4'>KHÓA HỌC NỔI BẬT</h2>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {courses.map((course) => (
          <div key={course.id} className='bg-white border rounded-lg overflow-hidden shadow-md w-80'>
            <div className='relative'>
              <img src={course.image} alt={course.title} className='w-full h-44 object-cover' />
              {course.purchased && (
                <span className='absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded'>New</span>
              )}
            </div>
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>{course.title}</h3>
              <p className='text-sm text-gray-600'>{course.description}</p>
              <p className='text-xl font-bold text-red-500 mt-2'>{course.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
