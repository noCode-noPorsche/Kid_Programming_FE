import { useState } from 'react'
import { Table, Tag, Input, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import { courses } from '../Data/courses'
import { useNavigate, useParams } from 'react-router-dom'
import StudentDetail from '../StudentDetail'

export default function StudentList() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [searchText, setSearchText] = useState('')

  if (selectedStudent) {
    return <StudentDetail studentId={selectedStudent} onBack={() => setSelectedStudent(null)} />
  }
  // Tìm khóa học theo id
  const selectedCourse = courses.find((course) => course.CoursesId === id)
  const filteredUsers = selectedCourse ? selectedCourse.students : []

  const columns: ColumnsType<(typeof filteredUsers)[0]> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Input
          placeholder='Search name'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 8, display: 'block' }}
        />
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toString().toLowerCase())
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress', render: (progress) => `${progress}%` },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={status === 'Completed' ? 'green' : 'volcano'}>{status}</Tag>
    },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'Completion Date', dataIndex: 'completionDate', key: 'completionDate' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link' onClick={() => setSelectedStudent(record.id)}>
            {' '}
            View Detail Student{' '}
          </Button>
          <Button type='link' danger>
            Gửi nhắc nhở
          </Button>
        </Space>
      )
    }
  ]

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <h1 className='text-2xl font-bold mb-4'>Danh sách học viên - Khóa {selectedCourse?.title}</h1>
      <Button onClick={() => navigate('/course-list-teacher')} type='default' className='mb-4'>
        Quay lại danh sách khóa học
      </Button>
      <Table columns={columns} dataSource={filteredUsers} pagination={{ pageSize: 8 }} rowKey='UserId' bordered />
    </div>
  )
}
