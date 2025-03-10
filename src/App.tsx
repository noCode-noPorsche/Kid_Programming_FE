import useRouteElements from './useRouteElement'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElement = useRouteElements()

  return (
    <AuthProvider>
      {routeElement}
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
