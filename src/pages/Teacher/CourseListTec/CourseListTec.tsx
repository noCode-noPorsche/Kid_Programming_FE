import { List, Button } from 'antd'
import { courses } from '../Data/courses'
import { useNavigate } from 'react-router-dom'

export default function CourseListTec() {
  const navigate = useNavigate()

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>List of courses</h1>
      <List
        dataSource={courses}
        renderItem={(course) => (
          <List.Item>
            <span>{course.title}</span>
            <Button type='link' onClick={() => course.CoursesId && navigate(`/student-list/${course.CoursesId}`)}>
              View students
            </Button>
          </List.Item>
        )}
      />
    </div>
  )
}
