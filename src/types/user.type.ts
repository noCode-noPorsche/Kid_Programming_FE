type Role = 'User' | 'Admin'

export interface User {
  _id: string
  fullName: string
  email: string
  role: Role[]
  phoneNumber: string
  date_of_birth: Date
  avatarUrl: string
  createdDate: Date
  updatedDate: Date
  status: string
  parentId: string
}
