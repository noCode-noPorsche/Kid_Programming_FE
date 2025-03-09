import { useRoutes } from 'react-router-dom'
import path from './constants/path'
import Login from './pages/Login'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import QuizSectionDetail from './pages/CourseList/QuizFunDetail'
import CourseDetail from './pages/CourseList/Course/CourseDetail'
import Payment from './pages/payment'
import StudentList from './pages/Teacher/StudentList'
import CourseListTec from './pages/Teacher/CourseListTec'
import TeacherDashboard from './pages/Teacher/TeacherDashboard'
import LessonDetail from './pages/CourseList/LessonDetail'
import { Chapter } from './pages/CourseList/Chapter/Chapter'
import BoughtCourses from './pages/BoughtCourse'


function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      )
    },
    {
      path: path.login,
      element: (
        <MainLayout>
          <Login />
        </MainLayout>
      )
    },
    {
      path: path.payment,
      element: <Payment />
    },
    // {
    //   path: path.BoughtCourses,
    //   element: (
    //     <MainLayout>
    //       <BoughtCourses courses={courses} />
    //     </MainLayout>
    //   )
    // },
    {
      path: path.quizSectionDetail,
      element: (
        <MainLayout>
          <QuizSectionDetail />
        </MainLayout>
      )
    },
    {
      path: path.courseDetail,
      element: (
        <MainLayout>
          <CourseDetail />
          <Chapter index={1} title='Chapter 1' />
        </MainLayout>
      )
    },
    {
      path: path.StudentList,
      element: <StudentList />
    },
    {
      path: path.CourseListTec,
      element: <CourseListTec />
    },
    {
      path: path.TeacherDashboard,
      element: <TeacherDashboard />
    },
    {
      path: path.LessonDetail,
      element: <LessonDetail />
    },
  ])
  return routeElement
}

export default useRouteElements
