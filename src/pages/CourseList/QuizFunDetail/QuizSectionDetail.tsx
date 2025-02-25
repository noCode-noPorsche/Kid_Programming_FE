import { useParams, useNavigate } from 'react-router-dom'

const quizzes = [
  {
    id: 1,
    title: 'Đố Vui Kỳ Đặc Biệt Số 01',
    description: 'Đố các bạn, ông Công ông Táo lên chầu trời bằng cách nào?',
    youtubeLink: 'https://www.youtube.com/embed/rT_zdLnnTnU',
    image: '/assets/dovuikydacbiet.png',
    author: 'Cô An Di',
    date: '10/01/2020',
    views: 140654,
    answer: `
    Vì cỏ nước mỗi ngày sinh gấp đôi nên ngày 65 cỏ nước phủ gấp đôi ngày 64.  
    Vậy sau 64 ngày cỏ nước đã phủ kín nửa mặt ao.  
    Chúc các bạn luôn vui! 🎉
  `
  },
  {
    id: 2,
    title: 'Đố vui Toán Học kỳ 13',
    description: 'Trong ao có một đám cỏ nước sinh đôi rất nhanh...',
    youtubeLink: 'https://www.youtube.com/embed/wMbCwOwjB1c',
    image: '/assets/dovuitoanhoc13.png',
    author: 'Cô An Di',
    date: '10/01/2020',
    views: 140654,
    answer: `
    Vì cỏ nước mỗi ngày sinh gấp đôi nên ngày 65 cỏ nước phủ gấp đôi ngày 64.  
    Vậy sau 64 ngày cỏ nước đã phủ kín nửa mặt ao.  
    Chúc các bạn luôn vui! 🎉
  `
  },
  {
    id: 3,
    title: 'Đố vui Toán Học kỳ 12',
    description: '3 tờ giấy kẹo thì đổi được 1 viên kẹo...',
    youtubeLink: 'https://www.youtube.com/embed/7fVBBOl9zjg',
    image: '/assets/dovuitoanhoc12.png',
    author: 'Cô An Di',
    date: '10/01/2020',
    views: 140654,
    answer: `
    Vì cỏ nước mỗi ngày sinh gấp đôi nên ngày 65 cỏ nước phủ gấp đôi ngày 64.  
    Vậy sau 64 ngày cỏ nước đã phủ kín nửa mặt ao.  
    Chúc các bạn luôn vui! 🎉
  `
  }
]

export default function QuizSectionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const quiz = quizzes.find((q) => q.id === Number(id))

  if (!quiz) {
    return <h2 className='text-center text-red-500'>Quiz không tồn tại!</h2>
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-6'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-[90%] max-w-6xl flex gap-8'>
        {/* Cột trái: Nội dung quiz */}
        <div className='flex-1'>
          <h2 className='text-3xl font-bold'>{quiz.title}</h2>
          <p className='text-sm text-gray-500'>
            Tác giả <span className='text-red-500 font-semibold'>{quiz.author}</span> | 🕒 {quiz.date} | 👁️ {quiz.views}
          </p>
          <p className='mt-4 text-gray-700'>{quiz.description}</p>

          {/* Nhúng video YouTube */}
          <div className='mt-4'>
            <iframe
              className='w-full h-[400px] rounded-lg shadow'
              src={quiz.youtubeLink}
              title={quiz.title}
              allowFullScreen
            ></iframe>
          </div>
          <div className='mt-6 p-4 bg-gray-100 rounded-lg'>
            <h3 className='text-lg font-semibold'>Đáp án như sau:</h3>
            <p className='mt-2 text-gray-700 whitespace-pre-line'>{quiz.answer}</p>
          </div>
          <button onClick={() => navigate(-1)} className='mt-6 bg-blue-500 text-white px-4 py-2 rounded-md'>
            Quay lại
          </button>
        </div>

        {/* Cột phải: Danh sách quiz khác */}
        <div className='w-72 bg-gray-50 p-4 rounded-lg shadow'>
          <h3 className='text-lg font-semibold text-red-500 border-b pb-2'>Đố vui khác</h3>
          <ul className='mt-3'>
            {quizzes.map((q) => (
              <li key={q.id} className='py-2 border-b flex gap-3'>
                {/* <img src={q.image} alt={q.title} className='w-16 h-16 object-cover rounded-md' /> */}
                <div>
                  <a href={`/quiz/${q.id}`} className='text-blue-500 hover:underline text-sm font-semibold'>
                    {q.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
