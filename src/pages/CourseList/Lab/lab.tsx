import { useState } from 'react'

interface Question {
  Question: string
  LabType: string
  Options: string[]
  CorrectAnswer: string
}

interface QuizProps {
  quiz: {
    LabId: number
    Title: string
    Description: string
    LimitedTime: number
    Questions: Question[]
  }
  onComplete: () => void
}

export default function Lab({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const handleNextQuestion = () => {
    // Kiểm tra nếu câu trả lời đúng, tăng điểm số
    if (selectedAnswer === quiz.Questions[currentQuestion].CorrectAnswer) {
      setScore(score + 1)
    }

    // Reset lựa chọn của user
    setSelectedAnswer('')

    // Nếu còn câu hỏi, chuyển sang câu tiếp theo
    if (currentQuestion + 1 < quiz.Questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizFinished(true)
    }
  }

  return (
    <div className='p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-xl font-bold'>{quiz.Title}</h2>
      <p className='mb-4'>{quiz.Description}</p>

      {quizFinished ? (
        <div className='text-center'>
          <h3 className='text-2xl font-semibold text-green-600'>🎉 Quiz hoàn thành!</h3>
          <p className='text-lg'>
            Điểm số của bạn:{' '}
            <strong>
              {score}/{quiz.Questions.length}
            </strong>
          </p>
          <button onClick={onComplete} className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg'>
            Tiếp tục
          </button>
        </div>
      ) : (
        <div>
          <p className='text-lg font-medium'>
            {currentQuestion + 1}. {quiz.Questions[currentQuestion].Question}
          </p>
          <ul className='mt-4'>
            {quiz.Questions[currentQuestion].Options.map((option, index) => (
              <li
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`cursor-pointer p-2 border rounded-lg ${
                  selectedAnswer === option ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className='mt-4 px-6 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50'
          >
            {currentQuestion === quiz.Questions.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
          </button>
        </div>
      )}
    </div>
  )
}
