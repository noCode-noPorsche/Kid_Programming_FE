import { Descriptions, Table } from 'antd'
import { courses } from '../Data/courses'
// import { useMemo } from 'react'

export default function StudentDetail({ studentId, onBack }: { studentId: string; onBack: () => void }) {
  const student = courses.flatMap((c) => c.students).find((s) => s.id === studentId)
  if (!student) return <p>Học viên không tồn tại</p>

  // const course = courses.find((c) => c.students.some((s) => s.id === studentId))
  // const courseAverage = useMemo(() => {
  //   if (!course) return null
  //   const totalStudents = course.students.length
  //   const avgProgress = course.students.reduce((sum, s) => sum + s.progress, 0) / totalStudents

  //   const totalLabScores = course.students.reduce(
  //     (acc, s) => {
  //       acc.lab1 += s.labScores.lab1
  //       acc.lab2 += s.labScores.lab2
  //       acc.lab3 += s.labScores.lab3
  //       return acc
  //     },
  //     { lab1: 0, lab2: 0, lab3: 0 }
  //   )
  //   return {
  //     avgProgress,
  //     avgLabScores: {
  //       lab1: totalLabScores.lab1 / totalStudents,
  //       lab2: totalLabScores.lab2 / totalStudents,
  //       lab3: totalLabScores.lab3 / totalStudents
  //     }
  //   }
  // }, [course])

  // const aiEvaluation =
  //   useMemo(() => {
  //     if (!courseAverage) return ''
  //     let feedback = ''

  //     if (student.progress < courseAverage.avgProgress - 10) {
  //       feedback +=
  //         'Tiến độ học tập của học viên đang chậm hơn so với trung bình của lớp. Hãy cố gắng hoàn thành bài tập đúng hạn. '
  //     } else {
  //       feedback += 'Học viên đang có tiến độ ổn định so với lớp. Hãy tiếp tục duy trì phong độ! '
  //     }

  //     Object.keys(student.labScores).forEach((lab) => {
  //       if (student.labScores[lab] < courseAverage.avgLabScores[lab] - 5) {
  //         feedback += `Điểm ${lab.toUpperCase()} của học viên thấp hơn trung bình. Hãy luyện tập thêm! `
  //       }
  //     })

  //     return feedback
  //   }, [student, courseAverage]) || ''
  // const labData = Object.entries(student.labScores).map(([lab, score]) => ({ lab, score }))

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg'>
      <button onClick={onBack} className='mb-4 text-blue-500'>
        ← Quay lại
      </button>
      <h1 className='text-2xl font-bold mb-4'>Chi tiết học viên</h1>
      <Descriptions bordered column={1}>
        <Descriptions.Item label='Tên'>{student.name}</Descriptions.Item>
        <Descriptions.Item label='Email'>{student.email}</Descriptions.Item>
        <Descriptions.Item label='Tiến trình'>{student.progress}%</Descriptions.Item>
        <Descriptions.Item label='Trạng thái'>{student.status}</Descriptions.Item>
        <Descriptions.Item label='Đang học chương'>{student.currentChapter}</Descriptions.Item>
        <Descriptions.Item label='Đang học bài'>{student.currentLesson}</Descriptions.Item>
      </Descriptions>

      <h2 className='text-xl font-bold mt-6 mb-2'>Điểm bài Lab</h2>
      <Table
        // dataSource={labData}
        columns={[
          { title: 'Lab', dataIndex: 'lab' },
          { title: 'Điểm', dataIndex: 'score' }
        ]}
        pagination={false}
      />
      <h2 className='text-xl font-bold mt-6 mb-2'>Đánh giá từ AI</h2>
      {/* <Alert message={aiEvaluation} type='info' showIcon /> */}
    </div>
  )
}
