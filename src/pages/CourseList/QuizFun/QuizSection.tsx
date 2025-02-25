import { useNavigate } from 'react-router-dom'

export default function QuizSection() {
  const navigate = useNavigate()
  const quizzes = [
    {
      id: 1,
      image: '/assets/dovuikydacbiet.png',
      title: 'Đố Vui Kỳ Đặc Biệt Số 01',
      description:
        'Đố các bạn, ông Công ông Táo lên chầu trời bằng cách nào? A: Đi máy bay B: Thả đèn trời C: Đạp xe D: Cưỡi cá chép'
    },
    {
      id: 2,
      image: '/assets/dovuitoanhoc13.png',
      title: 'Đố vui Toán Học kỳ 13',
      description:
        'Trong ao có một đám cỏ nước sinh đôi rất nhanh, mỗi ngày tăng gấp đôi, chỉ trong 65 ngày là phủ kín cả mặt ao. Vậy thì sau 64 ngày, cái ao bị phủ kín bao nhiêu phần?'
    },
    {
      id: 3,
      image: '/assets/dovuitoanhoc12.png',
      title: 'Đố vui Toán Học kỳ 12',
      description:
        '3 tờ giấy kẹo thì đổi được 1 viên kẹo. Vậy nếu bạn có 24 viên kẹo thì có thể đổi được tất cả bao nhiêu viên kẹo?'
    }
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      {quizzes.map((quiz) => (
        <div key={quiz.id} className='bg-white border rounded-lg overflow-hidden shadow-md w-80 mx-auto'>
          <div className='relative'>
            <img src={quiz.image} alt={quiz.title} className='w-full h-44 object-cover' />
          </div>
          <div className='p-4'>
            <h3 className='text-lg font-semibold'>{quiz.title}</h3>
            <p className='text-sm text-gray-600 line-clamp-2'>{quiz.description}</p>
          </div>
          <div className='border-t p-4 text-center'>
            <button
              onClick={() => navigate(`/quizsection/${quiz.id}`)}
              className='text-orange-500 font-semibold flex items-center justify-center gap-2'
            >
              <span>👁️ Đọc tiếp...</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
