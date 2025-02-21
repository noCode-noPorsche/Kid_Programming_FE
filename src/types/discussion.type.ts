export interface Discussion {
  _id: string
  courseId: string
  userId: string
  message: string
  createdDate: Date
  parentId: string
}
