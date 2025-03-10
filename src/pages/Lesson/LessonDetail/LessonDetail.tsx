import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useState } from 'react'
import LessonLogic from '../LessonLogic/Lessonlogic'
import LessonLoop from '../Lessonloop/LessonLoop'

interface Lesson {
  Title: string
  Content: string
  MaterialUrl: string
  Order: number
  ChapterId: number
}

const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    chapters: [
      {
        chapterIndex: 0,
        title: 'Chương 1: Tư duy Logic cơ bản',
        description: 'Học về các câu lệnh điều kiện if-else và các phép so sánh',
        lessons: [
          {
            Title: 'Bài 1: Giới thiệu về Logic',
            Content: 'Logic là nền tảng của lập trình. Trong bài học này, chúng ta sẽ tìm hiểu về các khái niệm cơ bản của logic trong lập trình.',
            MaterialUrl: 'https://example.com/logic-intro',
            Order: 1,
            ChapterId: 1
          },
          {
            Title: 'Bài 2: Câu lệnh điều kiện if',
            Content: 'Câu lệnh if là một trong những cấu trúc điều khiển cơ bản nhất trong lập trình. Nó cho phép chương trình thực hiện các hành động khác nhau dựa trên điều kiện.',
            MaterialUrl: 'https://example.com/if-statement',
            Order: 2,
            ChapterId: 1
          },
          {
            Title: 'Bài 3: Câu lệnh if-else',
            Content: 'Câu lệnh if-else mở rộng khả năng của if bằng cách cho phép thực hiện một hành động thay thế khi điều kiện không được thỏa mãn.',
            MaterialUrl: 'https://example.com/if-else',
            Order: 3,
            ChapterId: 1
          },
          {
            Title: 'Bài 4: Điều kiện phức tạp',
            Content: 'Trong thực tế, chúng ta thường cần kết hợp nhiều điều kiện để đưa ra quyết định. Bài học này sẽ hướng dẫn bạn cách sử dụng các toán tử logic để tạo điều kiện phức tạp.',
            MaterialUrl: 'https://example.com/complex-conditions',
            Order: 4,
            ChapterId: 1
          }
        ],
        lab: {
          component: LessonLogic,
          title: 'Lab 1: Thực hành Logic cơ bản',
          description: 'Hoàn thành các bài tập thực hành về logic cơ bản'
        }
      },
      {
        chapterIndex: 1,
        title: 'Chương 2: Vòng lặp cơ bản',
        description: 'Học về vòng lặp và cách sử dụng vòng lặp để giải quyết bài toán',
        lessons: [
          {
            Title: 'Bài 1: Giới thiệu về Vòng lặp',
            Content: 'Vòng lặp là một cấu trúc điều khiển cho phép thực hiện một đoạn code nhiều lần. Trong bài học này, chúng ta sẽ tìm hiểu về tầm quan trọng của vòng lặp trong lập trình.',
            MaterialUrl: 'https://example.com/loop-intro',
            Order: 1,
            ChapterId: 2
          },
          {
            Title: 'Bài 2: Vòng lặp for',
            Content: 'Vòng lặp for là một trong những loại vòng lặp phổ biến nhất. Nó thường được sử dụng khi chúng ta biết chính xác số lần cần lặp lại.',
            MaterialUrl: 'https://example.com/for-loop',
            Order: 2,
            ChapterId: 2
          },
          {
            Title: 'Bài 3: Vòng lặp while',
            Content: 'Vòng lặp while được sử dụng khi chúng ta không biết trước số lần cần lặp lại, mà chỉ biết điều kiện dừng.',
            MaterialUrl: 'https://example.com/while-loop',
            Order: 3,
            ChapterId: 2
          }
        ],
        lab: {
          component: LessonLoop,
          title: 'Lab 2: Thực hành Vòng lặp',
          description: 'Hoàn thành các bài tập thực hành về vòng lặp'
        }
      }
    ]
  }
]

export default function LessonDetail() {
  const { id, chapterIndex, lessonIndex } = useParams()
  const navigate = useNavigate()
  const [openChapters, setOpenChapters] = useState<{ [key: number]: boolean }>({})

  const toggleChapter = (chIdx: number) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chIdx]: !prev[chIdx]
    }))
  }

  if (!id) return <p>Invalid course path.</p>

  const course = courses.find((c) => c.id === Number(id))
  if (!course) return <p>Khóa học không tồn tại.</p>

  const selectedChapterIdx = Number(chapterIndex)
  const selectedLessonIdx = Number(lessonIndex)
  const currentChapter = course.chapters[selectedChapterIdx]
  const currentLesson = currentChapter?.lessons[selectedLessonIdx]

  const startLab = (chapterIdx: number) => {
    navigate(`/course/${id}/chapter/${chapterIdx}/lesson/lab`)
  }

  return (
    <div className='flex h-full pl-10 pr-12 pt-10'>
      <div className='w-2/3 h-full p-6 bg-white shadow-lg'>
        {lessonIndex === 'lab' ? (
          <div>
            <h1 className='text-2xl font-bold mb-4'>{currentChapter.lab.title}</h1>
            <p className='text-gray-600 mb-6'>{currentChapter.lab.description}</p>
            <currentChapter.lab.component
              onComplete={() => {
                if (selectedChapterIdx < course.chapters.length - 1) {
                  navigate(`/course/${id}/chapter/${selectedChapterIdx + 1}/lesson/0`)
                } else {
                  navigate('/course-list')
                }
              }}
            />
          </div>
        ) : selectedChapterIdx >= 0 && selectedLessonIdx >= 0 ? (
          <>
            <h1 className='text-2xl font-bold mb-4'>{currentLesson.Title}</h1>
            <p className='text-gray-600 mb-6'>{currentLesson.Content}</p>
            {currentLesson.MaterialUrl && (
              <a
                href={currentLesson.MaterialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-6"
              >
                Xem tài liệu
              </a>
            )}
            <div className='flex justify-between mt-4'>
              <Button
                type='default'
                onClick={() => {
                  if (selectedLessonIdx > 0) {
                    navigate(`/course/${id}/chapter/${selectedChapterIdx}/lesson/${selectedLessonIdx - 1}`)
                  } else if (selectedChapterIdx > 0) {
                    const prevChapter = course.chapters[selectedChapterIdx - 1]
                    navigate(`/course/${id}/chapter/${selectedChapterIdx - 1}/lesson/${prevChapter.lessons.length - 1}`)
                  }
                }}
                disabled={selectedLessonIdx === 0 && selectedChapterIdx === 0}
              >
                Bài trước
              </Button>
              <Button
                type='primary'
                onClick={() => {
                  if (selectedLessonIdx < currentChapter.lessons.length - 1) {
                    navigate(`/course/${id}/chapter/${selectedChapterIdx}/lesson/${selectedLessonIdx + 1}`)
                  } else {
                    startLab(selectedChapterIdx)
                  }
                }}
              >
                {selectedLessonIdx === currentChapter.lessons.length - 1 ? 'Làm bài Lab' : 'Bài tiếp theo'}
              </Button>
            </div>
          </>
        ) : (
          <div className='text-center py-8'>
            <h2 className='text-2xl font-bold mb-4'>Chào mừng đến với khóa học {course.title}</h2>
            <p className='text-gray-600 mb-6'>Hãy chọn một bài học để bắt đầu</p>
          </div>
        )}
      </div>

      <div className='w-1/3 p-4 bg-gray-100 border-l'>
        <h2 className='text-2xl font-semibold mb-4'>{course.title}</h2>
        {course.chapters.map((chapter, chIdx) => (
          <div key={chIdx} className='mb-6 border p-2 pl-4 rounded-lg'>
            <h3
              className='text-lg font-bold cursor-pointer flex justify-between items-center'
              onClick={() => toggleChapter(chIdx)}
            >
              {chapter.title}
              <span>{openChapters[chIdx] ? '▲' : '▼'}</span>
            </h3>

            {openChapters[chIdx] && (
              <>
                <ul className='pl-4 mt-2 border pl-5 rounded-lg'>
                  {chapter.lessons.map((lesson, idx) => (
                    <li
                      key={idx}
                      className={`p-2 cursor-pointer ${chIdx === selectedChapterIdx && idx === selectedLessonIdx ? 'bg-blue-100 rounded' : ''
                        } hover:bg-blue-50`}
                      onClick={() => navigate(`/course/${id}/chapter/${chIdx}/lesson/${idx}`)}
                    >
                      {lesson.Title}
                    </li>
                  ))}
                </ul>
                <Button type='primary' className='mt-2' onClick={() => startLab(chIdx)}>
                  Làm bài Lab
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
