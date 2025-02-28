import { useParams, useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { useState } from 'react'
import Lab from '../Lab/lab'


const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    chapters: [
      {
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
            },
            {
              Question: 'Which of the following is a logical fallacy?',
              LabType: 'multiple-choice',
              Options: ['Ad Hominem', 'Syllogism', 'Inductive reasoning', 'Deductive reasoning'],
              CorrectAnswer: 'Ad Hominem'
            }
          ]
        }
      },
      {
        title: 'Advanced Logical Thinking',
        lessons: [
          'Logical Fallacies',
          'Deductive vs. Inductive Reasoning',
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
            },
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
  const [quizStarted, setQuizStarted] = useState(false)

  if (!id || !chapterIndex || !lessonIndex) {
    return <p>Invalid lesson path.</p>
  }

  const course = courses.find((c) => c.id === Number(id))
  if (!course) return <p>Khóa học không tồn tại.</p>

  const chapterIdx = Number(chapterIndex)
  if (isNaN(chapterIdx) || chapterIdx < 0 || chapterIdx >= course.chapters.length) {
    return <p>Chương không tồn tại hoặc không hợp lệ.</p>
  }

  const chapter = course.chapters[chapterIdx]

  const lessonIdx = Number(lessonIndex)
  if (isNaN(lessonIdx) || lessonIdx < 0 || lessonIdx >= chapter.lessons.length) {
    if (!quizStarted) return <p>Bài học không tồn tại.</p>
  }

  const nextLesson = () => {
    const nextIndex = lessonIdx + 1
    if (nextIndex < chapter.lessons.length) {
      navigate(`/course/${id}/chapter/${chapterIndex}/lesson/${nextIndex}`)
    } else {
      setQuizStarted(true)
    }
  }

  return (
    <div className='flex h-screen'>
      <div className='w-3/4 p-6 bg-white shadow-lg'>
        {quizStarted ? (
          <Lab
            quiz={chapter.quiz} // Đảm bảo prop quiz tồn tại
            onComplete={() => navigate(`/course/${id}/chapter/${chapterIdx + 1}/lesson/0`)}
          />
        ) : (
          <>
            <h1 className='text-2xl font-bold mb-4'>{chapter.lessons[lessonIdx]}</h1>
              <p className='text-lg'>
                Nội dung bài học ở đây
              {/* <BlocklyLesson /> */}
            </p>
            <Button type='primary' className='mt-4' onClick={nextLesson}>
              {lessonIdx >= chapter.lessons.length - 1 ? 'Start Quiz' : 'Next Lesson'}
            </Button>
          </>
        )}
      </div>

      <div className='w-1/4 p-4 bg-gray-100 border-l'>
        <h2 className='text-xl font-semibold mb-3'>{chapter.title}</h2>
        <ul>
          {chapter.lessons.map((l, idx) => (
            <li
              key={idx}
              className={`p-2 cursor-pointer ${idx === lessonIdx ? 'font-bold' : ''}`}
              onClick={() => navigate(`/course/${id}/chapter/${chapterIndex}/lesson/${idx}`)}
            >
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
