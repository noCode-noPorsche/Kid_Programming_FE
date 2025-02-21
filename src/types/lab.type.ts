export interface Lab {
  _id: string
  lessonId: string
  question: string
  title: string
  description: string
  result: number
  labType: string
  limitedTime: number
  correctAnswer: number
  createdDate: Date
  updatedDate: Date
}
