import { useRoutes } from 'react-router-dom'
import Login from './pages/Login'

function useRouteElements() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: <Login />
    }
  ])
  return routeElement
}

export default useRouteElements
