import { useEffect, useState } from 'react'
import http from '../../../utils/http'

interface Lesson {
  id: string
  title: string
  order: number
  chapterId: string
}

interface ChapterProps {
  index: number
  title: string
  id: string
}

export function Chapter({ index, title, id }: ChapterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [lessons, setLessons] = useState<Lesson[]>([])

  const fetchLessons = async () => {
    try {
      const res = await http.get(`lessons?chapterId=CHAP1&index=1&pageSize=10`)//CHAP1
      console.log('📌 Danh sách bài học của chapter:', res.data)

      if (res.data?.data?.items) {
        setLessons(res.data.data.items)
      } else {
        console.warn('❌ Không có bài học nào trong chapter này')
      }
    } catch (error: unknown) {
      console.error('Lỗi khi lấy danh sách bài học:', error)
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { data: unknown; status: number } }
        console.error('Server error:', axiosError.response.data)
        console.error('Status code:', axiosError.response.status)
      }
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchLessons()
    }
  }, [isOpen])

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
            <li key={lesson.id} className='text-gray-700 text-base'>
              <strong>{`Bài ${lesson.order}: ${lesson.title}`}</strong>
            </li>
          ))
        ) : (
          <li className='text-gray-500 text-base'>Không có bài học nào.</li>
        )}
      </ul>
    </li>
  )
}
