import { useEffect, useState } from 'react'
import http from '../../../utils/http'

interface Lesson {
  order: string
  title: string
  content: string
}

interface ChapterProps {
  index: number
  title: string
}

export function Chapter({ index, title }: ChapterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lessons, setLessons] = useState<Lesson[]>([])

  const fetchChapter = async () => {
    try {
      const res = await http.get(`chapter?courseId=COURSE1&index=1&pageSize=10`)
      console.log('Fetched chapters:', res.data) // Debug: kiểm tra API trả về gì
      if (res.data && res.data.data && res.data.data.items) {
        setLessons(res.data.data.items)
      } else {
        console.warn('Không có dữ liệu chương')
      }
    } catch (error) {
      console.error('Error fetching chapter:', error)
    }
  }

  useEffect(() => {
    fetchChapter()
  }, [])

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
        className={`pl-5 mt-2 list-disc transition-all duration-300 ease-in-out 
        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <li key={lesson.order} className='text-gray-700 text-base'>
              <strong>{lesson.title}:</strong> {lesson.content}
            </li>
          ))
        ) : (
          <li className='text-gray-500 text-base'>Không có bài học nào.</li>
        )}
      </ul>
    </li>
  )
}
