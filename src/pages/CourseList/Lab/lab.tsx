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

  const handleNextQuestion = () => {
    if (selectedAnswer === quiz.Questions[currentQuestion].CorrectAnswer) {
      setScore(score + 1)
    }
    setSelectedAnswer('')
    if (currentQuestion + 1 < quiz.Questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      alert(`Quiz hoàn thành! Điểm số của bạn: ${score + 1}/${quiz.Questions.length}`)
      onComplete()
    }
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold'>{quiz.Title}</h2>
      <p>{quiz.Description}</p>
      <div className='mt-4'>
        <p className='text-lg'>{quiz.Questions[currentQuestion].Question}</p>
        <ul>
          {quiz.Questions[currentQuestion].Options.map((option, index) => (
            <li key={index} onClick={() => setSelectedAnswer(option)} className='cursor-pointer p-2 border'>
              {option}
            </li>
          ))}
        </ul>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswer}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Next
        </button>
      </div>
    </div>
  )
}
