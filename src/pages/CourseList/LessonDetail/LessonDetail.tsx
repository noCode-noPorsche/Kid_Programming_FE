import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useState } from 'react'
import Lab from '../Lab/lab'
// import LessonLogic from '../../Lesson/LessonLogic/Lessonlogic'

const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    chapters: [
      {
        chapterIndex: 0,
        title: 'Introduction to Logic and Critical Thinking',
        lessons: [
          'What is Logic?',
          'The Importance of Critical Thinking',
          'Everyday Logical Thinking',
          'Identifying Logical and Illogical Statements'
        ],
        quiz: {
          LabId: 1,
          Title: 'Logic Quiz 1',
          Description: 'Test your knowledge on logic and critical thinking.',
          LimitedTime: 300,
          Questions: [
            {
              Question: 'What is logic?',
              LabType: 'multiple-choice',
              Options: ['A way of thinking', 'A type of emotion', 'A programming language', 'A mathematical function'],
              CorrectAnswer: 'A way of thinking'
            }
          ]
        }
      },
      {
        chapterIndex: 1,
        title: 'Advanced Logical Thinking',
        lessons: ['Logical Fallacies', 'Deductive vs. Inductive Reasoning', 'Advanced Logical Applications'],
        quiz: {
          LabId: 2,
          Title: 'Logic Quiz 2',
          Description: 'Test your logical reasoning skills.',
          LimitedTime: 300,
          Questions: [
            {
              Question: 'Which of the following is a logical fallacy?',
              LabType: 'multiple-choice',
              Options: ['Ad Hominem', 'Syllogism', 'Inductive reasoning', 'Deductive reasoning'],
              CorrectAnswer: 'Ad Hominem'
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [quizStarted, setQuizStarted] = useState(false)

  const toggleChapter = (chIdx: number) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chIdx]: !prev[chIdx] // Đảo ngược trạng thái mở/đóng
    }))
  }
  if (!id) {
    return <p>Invalid course path.</p>
  }

  const course = courses.find((c) => c.id === Number(id))
  if (!course) return <p>Khóa học không tồn tại.</p>

  const selectedChapterIdx = Number(chapterIndex)
  const selectedLessonIdx = Number(lessonIndex)

  const startQuiz = (chapterIdx: number) => {
    setQuizStarted(true)
    navigate(`/course/${id}/chapter/${chapterIdx}/lesson/quiz`)
  }

  return (
    <div className='flex h-full pl-10 pr-12 pt-10'>
      <div className='w-2/3 h-full p-6 bg-white shadow-lg'>
        {lessonIndex === 'quiz' ? (
          <Lab
            quiz={course.chapters[selectedChapterIdx]?.quiz}
            onComplete={() => navigate(`/course/${id}/chapter/${selectedChapterIdx + 1}/lesson/0`)}
          />
        ) : selectedChapterIdx >= 0 && selectedLessonIdx >= 0 ? (
          <>
            <h1 className='text-2xl font-bold mb-4'>
              {course.chapters[selectedChapterIdx].lessons[selectedLessonIdx]}
            </h1>
            {/* <LessonLogic lessonIndex={selectedLessonIdx} /> */}
            <div className='flex justify-between'>
              <span className='flex justify-end bt-30'>
                <Button
                  type='default'
                  className='mt-4'
                  onClick={() =>
                    navigate(`/course/${id}/chapter/${selectedChapterIdx}/lesson/${selectedLessonIdx + 1}`)
                  }
                >
                  Prev Lesson
                </Button>
              </span>
              <span className='flex justify-end bt-30'>
                <Button
                  type='default'
                  className='mt-4'
                  onClick={() =>
                    navigate(`/course/${id}/chapter/${selectedChapterIdx}/lesson/${selectedLessonIdx + 1}`)
                  }
                >
                  Next Lesson
                </Button>
              </span>
            </div>
          </>
        ) : (
          <p>Chọn bài học để bắt đầu</p>
        )}
      </div>

      <div className='w-1/3 p-4 bg-gray-100 border-l'>
        <h2 className='text-2xl font-semibold mb-4'>{course.title}</h2>
        {course.chapters.map((chapter, chIdx) => (
          <div key={chIdx} className='mb-6 border p-2 pl-4 rounded-lg'>
            {/* Chương */}
            <h3
              className='text-lg font-bold cursor-pointer flex justify-between items-center'
              onClick={() => toggleChapter(chIdx)}
            >
              {chapter.title}
              <span>{openChapters[chIdx] ? '▲' : '▼'}</span> {/* Icon thu/phóng */}
            </h3>

            {/* Bài học - Hiển thị nếu chương mở */}
            {openChapters[chIdx] && (
              <ul className='pl-4 mt-2 border pl-5 rounded-lg'>
                {chapter.lessons.map((lesson, idx) => (
                  <li
                    key={idx}
                    className={`p-2 cursor-pointer ${
                      chIdx === selectedChapterIdx && idx === selectedLessonIdx ? 'font-bold' : ''
                    }`}
                    onClick={() => navigate(`/course/${id}/chapter/${chIdx}/lesson/${idx}`)}
                  >
                    {lesson}
                  </li>
                ))}
              </ul>
            )}
            {openChapters[chIdx] && (
              <Button type='primary' className='mt-2' onClick={() => startQuiz(chIdx)}>
                Start Quiz
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
