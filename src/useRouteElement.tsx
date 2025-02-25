import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import QuizSectionDetail from './pages/CourseList/QuizFunDetail'
import CourseDetail from './pages/CourseList/CourseDetail'
import Payment from './pages/Payment'

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
      path: path.PaymentPage,
      element: <Payment />
    },
    {
      path: path.QuizSectionDetail,
      element: (
        <MainLayout>
          <QuizSectionDetail />
        </MainLayout>
      )
    },
    {
      path: path.CourseDetail,
      element: (
        <MainLayout>
          <CourseDetail />
        </MainLayout>
      )
    }
  ])
  return routeElement
}

export default useRouteElements
