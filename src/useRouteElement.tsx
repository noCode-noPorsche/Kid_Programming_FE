import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'

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
    }
  ])
  return routeElement
}

export default useRouteElements
