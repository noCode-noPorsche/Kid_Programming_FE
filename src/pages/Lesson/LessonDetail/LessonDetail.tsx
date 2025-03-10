import { useState } from 'react'
import LessonLogic from '../LessonLogic/Lessonlogic'
import LessonLoop from '../Lessonloop/LessonLoop'
import Lab from '../../CourseList/Lab/lab'
import { useNavigate, useParams } from 'react-router-dom'

const chapters = [
  {
    id: 1,
    title: 'Chương 1: Tư duy Logic cơ bản',
    description: 'Học về các câu lệnh điều kiện if-else và các phép so sánh',
    component: LessonLogic,
    lab: {
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
    id: 2,
    title: 'Chương 2: Vòng lặp cơ bản',
    description: 'Học về vòng lặp và cách sử dụng vòng lặp để giải quyết bài toán',
    component: LessonLoop,
    lab: {
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

const LessonDetail = () => {
  const { id, chapterIndex, lessonIndex } = useParams()
  const [showingLab, setShowingLab] = useState(false)
  const navigate = useNavigate()

  // Kiểm tra id khóa học
  if (!id || Number(id) !== 1) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Khóa học không tồn tại</h2>
        <p className="mt-2 text-gray-600">Vui lòng kiểm tra lại đường dẫn</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Quay về trang chủ
        </button>
      </div>
    )
  }

  const currentChapterIdx = Number(chapterIndex || 0)
  const currentChapter = chapters[currentChapterIdx]

  const handleChapterComplete = () => {
    setShowingLab(true)
  }

  const handleLabComplete = () => {
    setShowingLab(false)
    if (currentChapterIdx < chapters.length - 1) {
      navigate(`/course/${id}/chapter/${currentChapterIdx + 1}/lesson/0`)
    } else {
      // Hoàn thành tất cả các chương
      navigate('/course')
    }
  }

  const CurrentChapterComponent = currentChapter.component

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-4'>{currentChapter.title}</h1>
        <p className='text-gray-600'>{currentChapter.description}</p>
      </div>

      <div className='bg-white rounded-lg shadow-lg p-6'>
        {showingLab ? (
          <Lab quiz={currentChapter.lab} onComplete={handleLabComplete} />
        ) : (
          <CurrentChapterComponent onComplete={handleChapterComplete} />
        )}
      </div>

      <div className='mt-8 flex justify-between'>
        <button
          className='px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300'
          onClick={() => {
            setShowingLab(false)
            navigate(`/course/${id}/chapter/${Math.max(0, currentChapterIdx - 1)}/lesson/0`)
          }}
          disabled={currentChapterIdx === 0}
        >
          ← Chương trước
        </button>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          onClick={() => {
            setShowingLab(false)
            navigate(`/course/${id}/chapter/${Math.min(chapters.length - 1, currentChapterIdx + 1)}/lesson/0`)
          }}
          disabled={currentChapterIdx === chapters.length - 1}
        >
          Chương tiếp theo →
        </button>
      </div>
    </div>
  )
}

export default LessonDetail
