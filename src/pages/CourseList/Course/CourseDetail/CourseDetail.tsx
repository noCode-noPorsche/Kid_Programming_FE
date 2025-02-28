import { Link, useParams } from 'react-router-dom'
import { useState, useRef } from 'react'
import path from '../../../../constants/path';
// import http from '../../../utils/http';


// Dữ liệu khóa học
const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    description: 'Giúp bé hiểu logic và cách xâu chuỗi lại với nhau.',
    image: 'https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2020/09/13/c5/ae/lo-trinh-hoc-tot-toan-1.png',
    purchased: true,
    price: '790.000 đ',
    chapters: [
      {
        title: 'Introduction to Logic and Critical Thinking',
        lessons: [
          'What is Logic?',
          'The Importance of Critical Thinking',
          'Everyday Logical Thinking',
          'Identifying Logical and Illogical Statements'
        ]
      },
      {
        title: 'Basic Operations in Logic',
        lessons: [
          'AND, OR, and NOT Operators',
          'Logical Equivalence',
          'Simple Logical Puzzles',
          'Common Logical Mistakes'
        ]
      },
      {
        title: 'Logical Expressions and Truth Tables',
        lessons: [
          'Understanding Logical Expressions',
          'Constructing Truth Tables',
          'Evaluating Logical Statements',
          'Practical Applications of Truth Tables'
        ]
      },
      {
        title: 'Propositions and Deductive Logic',
        lessons: [
          'Understanding Propositions',
          'Types of Propositional Statements',
          'Deductive vs. Inductive Reasoning',
          'Solving Logical Deduction Problems'
        ]
      },
      {
        title: 'Interesting and Challenging Logic Exercises',
        lessons: [
          'Logic Riddles and Brain Teasers',
          'Number and Pattern Puzzles',
          'Solving Real-World Logic Problems',
          'Advanced Logical Thinking Challenges'
        ]
      },
      {
        title: 'Applying Logic in Daily Life',
        lessons: [
          'Logical Thinking in Decision Making',
          'Problem-Solving with Logic',
          'Using Logic in Conversations and Debates',
          'Fun Logic Games for Daily Practice'
        ]
      }
    ]
  }
]

// http.get('/chapter?index=1&pageSize=10').then(res => {
//   console.log(res.data);
// });

// Component hiển thị từng chương
function Chapter({ index, title, lessons }: { index: number; title: string; lessons: string[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <li className='border rounded-lg mb-2 p-4 bg-gray-100 shadow-sm'>
      <div
        className='flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition duration-200'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-lg font-medium'>{`Chapter ${index + 1}: ${title}`}</span>
        <span className='text-xl'>{isOpen ? '🔽' : '▶️'}</span>
      </div>

      <ul
        className={`pl-5 mt-2 list-disc transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
      >
        {lessons.map((lesson, lessonIndex) => (
          <li key={lessonIndex} className='text-gray-700 text-base'>
            {lesson}
          </li>
        ))}
      </ul>
    </li>
  )
}

// Component chính hiển thị thông tin khóa học
export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const course = id ? courses.find((c) => c.id === parseInt(id, 10)) : undefined

  const courseInfoRef = useRef<HTMLDivElement>(null)
  const courseContentRef = useRef<HTMLDivElement>(null)

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
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>{course.title}</h1>
      <img src={course.image} alt={course.title} className='w-full h-64 object-cover rounded-lg mb-4 shadow-lg' />

      {/* Thanh menu điều hướng */}
      <ul className='flex border justify-between items-center rounded-full overflow-hidden text-lg font-semibold shadow-md w-full max-w-lg mx-auto sticky top-0 bg-white z-50 top-5'>
        <li
          className='px-4 py-3 bg-white text-black border-r cursor-pointer text-center'
          onClick={() => scrollToSection(courseInfoRef)}
        >
          COURSE INFORMATION
        </li>
        <li
          className='px-4 py-3 bg-white text-black cursor-pointer text-center'
          onClick={() => scrollToSection(courseContentRef)}
        >
          COURSE CONTENT
        </li>
        <li className='px-4 py-3 bg-white text-black border-l cursor-pointer flex items-center justify-center ml-auto'>
          🔍
        </li>
      </ul>

      {/* Thông tin khóa học */}
      <div ref={courseInfoRef} className='mt-8'>
        <h2 className='text-2xl font-semibold mb-3'>Course Information</h2>
        <p className='text-lg mb-4'>{course.description}</p>
        <p className='text-lg mb-4 bg-red-500 text-white p-2'>Price: {course.price}</p>
        <Link to={path.payment} className='text-lg mb-4 bg-green-500 text-white p-2'>Buy Course</Link>
      </div>

      {/* Bài giảng miễn phí */}
      <div className='mt-8'>
        <h2 className='text-2xl font-semibold mb-3 text-blue-600'>Bài giảng miễn phí</h2>
        <ul className='list-none pl-0'>
          <li className='border rounded-lg mb-2 p-4 bg-green-100 shadow-sm'>
            <h3 className='text-lg font-medium'>Bài 1: Giới thiệu về Tư duy Logic</h3>
            <p className='text-gray-700 text-base'>Hiểu cơ bản về logic và tư duy phản biện.</p>
          </li>
          <li className='border rounded-lg mb-2 p-4 bg-green-100 shadow-sm'>
            <h3 className='text-lg font-medium'>Bài 2: Các phép toán logic cơ bản</h3>
            <p className='text-gray-700 text-base'>Tìm hiểu các phép toán logic AND, OR, NOT.</p>
          </li>
          <li className='border rounded-lg mb-2 p-4 bg-green-100 shadow-sm'>
            <h3 className='text-lg font-medium'>Bài 3: Giải đố vui với tư duy logic</h3>
            <p className='text-gray-700 text-base'>Áp dụng tư duy logic để giải các câu đố thú vị.</p>
          </li>
        </ul>
      </div>

      {/* Nội dung khóa học */}
      <div ref={courseContentRef} className='mt-8'>
        <h2 className='text-2xl font-semibold mb-3'>Course Content</h2>
        <ul className='list-none pl-0'>
          {course.chapters.map((chapter, index) => (
            <Chapter key={index} index={index} title={chapter.title} lessons={chapter.lessons} />
          ))}
        </ul>
      </div>
    </div>
  )
}
