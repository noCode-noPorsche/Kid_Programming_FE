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

import Profile from './pages/Profile/Profile'
import BoughtCourses from './pages/BoughtCourse'
import Contact from './pages/Contact'
import LessonDetail from './pages/Lesson/LessonDetail/LessonDetail'



export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        {
          path: path.home,
          element: <Home />
        },
        {
          path: path.profile,
          element: <Profile />
        },
        {
          path: path.courseDetail,
          element: <CourseDetail />
        },
        {
          path: path.quizSectionDetail,
          element: <QuizSectionDetail />
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
        {
          path: path.contact,
          element: <Contact />
        },
        {
          path: path.BoughtCourses,
          element: <BoughtCourses />
        },
      ]
    },
    {
      path: path.login,
      element: <Login />
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
  ])
  return routeElements
}
