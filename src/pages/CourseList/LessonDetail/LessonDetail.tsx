import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useState } from 'react'
import Lab from '../Lab/lab'
import LessonLogic from '../../Lesson/LessonLogic/Lessonlogic'
import LessonLoop from '../../Lesson/Lessonloop/LessonLoop'

const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    chapters: [
      {
        chapterIndex: 0,
        title: 'Chương 1: Tư duy Logic cơ bản',
        type: 'logic',
        lessons: [
          'Bài 1: Sử dụng "if" và "true"',
          'Bài 2: Sử dụng "if" và "false"',
          'Bài 3: Sử dụng "if" với điều kiện phức tạp',
          'Bài 4: Sử dụng câu lệnh "if-else"'
        ],
        quiz: {
          LabId: 1,
          Title: 'Lab 1: Kiểm tra kiến thức Logic cơ bản',
          Description: 'Hãy hoàn thành bài kiểm tra để kết thúc chương 1',
          LimitedTime: 300,
          Questions: [
            {
              Question: 'Câu lệnh if được sử dụng để làm gì?',
              LabType: 'multiple-choice',
              Options: [
                'Để lặp lại một đoạn code',
                'Để thực hiện code có điều kiện',
                'Để khai báo biến',
                'Để in ra màn hình'
              ],
              CorrectAnswer: 'Để thực hiện code có điều kiện'
            },
            {
              Question: 'Khi nào đoạn code trong if sẽ được thực thi?',
              LabType: 'multiple-choice',
              Options: [
                'Khi điều kiện là true',
                'Khi điều kiện là false',
                'Luôn luôn thực thi',
                'Không bao giờ thực thi'
              ],
              CorrectAnswer: 'Khi điều kiện là true'
            },
            {
              Question: 'Câu lệnh if-else được sử dụng khi nào?',
              LabType: 'multiple-choice',
              Options: [
                'Khi muốn thực hiện một trong hai khối lệnh',
                'Khi muốn thực hiện cả hai khối lệnh',
                'Khi muốn dừng chương trình',
                'Khi muốn lặp lại code'
              ],
              CorrectAnswer: 'Khi muốn thực hiện một trong hai khối lệnh'
            },
            {
              Question: 'Điều kiện phức tạp trong if là gì?',
              LabType: 'multiple-choice',
              Options: [
                'Kết hợp nhiều điều kiện bằng AND, OR',
                'Chỉ sử dụng một điều kiện đơn giản',
                'Không sử dụng điều kiện',
                'Sử dụng vòng lặp'
              ],
              CorrectAnswer: 'Kết hợp nhiều điều kiện bằng AND, OR'
            },
            {
              Question: 'Kết quả của !true là gì?',
              LabType: 'multiple-choice',
              Options: ['true', 'false', 'null', 'undefined'],
              CorrectAnswer: 'false'
            }
          ]
        }
      },
      {
        chapterIndex: 1,
        title: 'Chương 2: Vòng lặp cơ bản',
        type: 'loop',
        lessons: ['Bài 1: In lời chào nhiều lần', 'Bài 2: Đếm từ 1 đến 10', 'Bài 3: Tính tổng các số từ 1 đến 10'],
        quiz: {
          LabId: 2,
          Title: 'Lab 2: Kiểm tra kiến thức về Vòng lặp',
          Description: 'Hãy hoàn thành bài kiểm tra để kết thúc chương 2',
          LimitedTime: 300,
          Questions: [
            {
              Question: 'Vòng lặp được sử dụng để làm gì?',
              LabType: 'multiple-choice',
              Options: [
                'Lặp lại một đoạn code nhiều lần',
                'Thực hiện code có điều kiện',
                'Khai báo biến',
                'In ra màn hình'
              ],
              CorrectAnswer: 'Lặp lại một đoạn code nhiều lần'
            },
            {
              Question: 'Biến đếm trong vòng lặp có tác dụng gì?',
              LabType: 'multiple-choice',
              Options: ['Đếm số lần lặp', 'Lưu kết quả tính toán', 'Không có tác dụng gì', 'Dừng vòng lặp'],
              CorrectAnswer: 'Đếm số lần lặp'
            },
            {
              Question: 'Để tính tổng các số từ 1 đến 10, ta cần:',
              LabType: 'multiple-choice',
              Options: [
                'Sử dụng vòng lặp và biến tổng',
                'Chỉ sử dụng if-else',
                'Không cần dùng vòng lặp',
                'In ra màn hình 10 lần'
              ],
              CorrectAnswer: 'Sử dụng vòng lặp và biến tổng'
            },
            {
              Question: 'Vòng lặp vô hạn là gì?',
              LabType: 'multiple-choice',
              Options: [
                'Vòng lặp không có điều kiện dừng',
                'Vòng lặp chạy đúng 10 lần',
                'Vòng lặp không chạy',
                'Vòng lặp có điều kiện dừng'
              ],
              CorrectAnswer: 'Vòng lặp không có điều kiện dừng'
            },
            {
              Question: 'Khi nào nên sử dụng vòng lặp?',
              LabType: 'multiple-choice',
              Options: [
                'Khi cần thực hiện một công việc nhiều lần',
                'Khi cần thực hiện công việc một lần',
                'Khi cần kiểm tra điều kiện',
                'Khi cần dừng chương trình'
              ],
              CorrectAnswer: 'Khi cần thực hiện một công việc nhiều lần'
            }
          ]
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

  const startQuiz = (chapterIdx: number) => {
    navigate(`/course/${id}/chapter/${chapterIdx}/lesson/quiz`)
  }

  return (
    <div className='flex h-full pl-10 pr-12 pt-10'>
      <div className='w-2/3 h-full p-6 bg-white shadow-lg'>
        {lessonIndex === 'quiz' ? (
          <Lab
            quiz={currentChapter.quiz}
            onComplete={() => {
              if (selectedChapterIdx < course.chapters.length - 1) {
                navigate(`/course/${id}/chapter/${selectedChapterIdx + 1}/lesson/0`)
              } else {
                navigate('/course-list')
              }
            }}
          />
        ) : selectedChapterIdx >= 0 && selectedLessonIdx >= 0 ? (
          <>
            <h1 className='text-2xl font-bold mb-4'>{currentChapter.lessons[selectedLessonIdx]}</h1>
            {currentChapter.type === 'logic' ? <LessonLogic /> : <LessonLoop />}
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
                    startQuiz(selectedChapterIdx)
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
                      className={`p-2 cursor-pointer ${
                        chIdx === selectedChapterIdx && idx === selectedLessonIdx ? 'bg-blue-100 rounded' : ''
                      } hover:bg-blue-50`}
                      onClick={() => navigate(`/course/${id}/chapter/${chIdx}/lesson/${idx}`)}
                    >
                      {lesson}
                    </li>
                  ))}
                </ul>
                <Button type='primary' className='mt-2' onClick={() => startQuiz(chIdx)}>
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
