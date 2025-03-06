import { Link, useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import path from '../../../../constants/path'
import http from '../../../../utils/http'
import { Chapter } from '../../Chapter/Chapter'

interface Course {
  id: string
  title: string
  description: string
  price: number
  image?: string
}

interface ChapterData {
  id: string
  title: string
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [chapters, setChapters] = useState<ChapterData[]>([])

  const courseInfoRef = useRef<HTMLDivElement>(null)
  const courseContentRef = useRef<HTMLDivElement>(null)

  // Fetch dữ liệu khóa học
  const fetchCourseDetail = async () => {
    try {
      const res = await http.get(`courses?index=1&pageSize=5`)
      console.log('Fetched courses:', res.data)

      if (res.data?.data?.items) {
        const foundCourse = res.data.data.items
        setCourse(foundCourse)
        console.log('Found course:', foundCourse)
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    }
  }

  // Fetch danh sách chương
  const fetchChapters = async () => {
    try {
      const res = await http.get(`chapter?courseId=${id}&index=1&pageSize=10`)
      console.log('Fetched chapters:', res.data)

      if (res.data?.data?.items) {
        setChapters(res.data.data.items)
      }
    } catch (error) {
      console.error('Error fetching chapters:', error)
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
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>{course.title}</h1>
      {course.image && (
        <img src={course.image} alt={course.title} className='w-full h-64 object-cover rounded-lg mb-4 shadow-lg' />
      )}

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
        <Link to={path.payment} className='text-lg mb-4 bg-green-500 text-white p-2'>
          Buy Course
        </Link>
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
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => <Chapter key={chapter.id} index={index} title={chapter.title} />)
          ) : (
            <p className='text-gray-500'>Không có nội dung khóa học.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

// const courses = [
//   {
//     id: 1,
//     title: 'Logic vui nhộn',
//     description: 'Giúp bé hiểu logic và cách xâu chuỗi lại với nhau.',
//     image: 'https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2020/09/13/c5/ae/lo-trinh-hoc-tot-toan-1.png',
//     purchased: true,
//     price: '790.000 đ',
//     chapters: [
//       {
//         title: 'Introduction to Logic and Critical Thinking',
//         lessons: [
//           'What is Logic?',
//           'The Importance of Critical Thinking',
//           'Everyday Logical Thinking',
//           'Identifying Logical and Illogical Statements'
//         ]
//       },
//       {
//         title: 'Basic Operations in Logic',
//         lessons: [
//           'AND, OR, and NOT Operators',
//           'Logical Equivalence',
//           'Simple Logical Puzzles',
//           'Common Logical Mistakes'
//         ]
//       },
//       {
//         title: 'Logical Expressions and Truth Tables',
//         lessons: [
//           'Understanding Logical Expressions',
//           'Constructing Truth Tables',
//           'Evaluating Logical Statements',
//           'Practical Applications of Truth Tables'
//         ]
//       },
//       {
//         title: 'Propositions and Deductive Logic',
//         lessons: [
//           'Understanding Propositions',
//           'Types of Propositional Statements',
//           'Deductive vs. Inductive Reasoning',
//           'Solving Logical Deduction Problems'
//         ]
//       },
//       {
//         title: 'Interesting and Challenging Logic Exercises',
//         lessons: [
//           'Logic Riddles and Brain Teasers',
//           'Number and Pattern Puzzles',
//           'Solving Real-World Logic Problems',
//           'Advanced Logical Thinking Challenges'
//         ]
//       },
//       {
//         title: 'Applying Logic in Daily Life',
//         lessons: [
//           'Logical Thinking in Decision Making',
//           'Problem-Solving with Logic',
//           'Using Logic in Conversations and Debates',
//           'Fun Logic Games for Daily Practice'
//         ]
//       }
//     ]
//   }
// ]
