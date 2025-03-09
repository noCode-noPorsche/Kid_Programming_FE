import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import http from '../../utils/http'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const navigate = useNavigate()
  const { fetchUser } = useAuth()

  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential) throw new Error('Không lấy được credential')

      const token = await result.user.getIdToken()
      const response = await http.post('auth/login-google', { idToken: token })
      const data = response.data.data.token
      localStorage.setItem('token', data)
      await fetchUser()

      toast.success('Đăng nhập thành công!', {
        position: 'top-right',
        autoClose: 1500,
        onClose: () => {
          onClose()
          navigate(path.home)
        }
      })
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error)
      toast.error('Đăng nhập thất bại, vui lòng thử lại!')
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* Overlay */}
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
          aria-hidden='true'
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full'>
          <div className='p-6 space-y-8'>
            {/* Logo và tiêu đề */}
            <div className='text-center'>
              <img
                className='mx-auto h-16 w-auto'
                src='https://cdn-icons-png.flaticon.com/512/2436/2436874.png'
                alt='Logo'
              />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Chào mừng trở lại!</h2>
              <p className='mt-2 text-sm text-gray-600'>Đăng nhập để bắt đầu hành trình học lập trình của bạn</p>
            </div>

            {/* Nút đăng nhập Google */}
            <div>
              <button
                onClick={handleLoginGoogle}
                className='group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 border-gray-300 transition-all duration-300 hover:shadow-lg'
              >
                <img
                  alt='Google'
                  className='w-6 h-6 mr-2'
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAABF1BMVEX////lQzU0o1NCgO/2twTq7/29z/k4fO/6/P72tQAYb+3kPi8ln0nlQTPkOir1sADD1PktoU752tjkNiX64N7++u8AmTfiGwD3wDganUP2+/dAp1z75eP3zMrjJQnoYljqcmrmUUX1wr/ukIrjLhrxpaDshH3mSz73vj/61Yv4ymP3vS33wk/+9+b50oL979P747H86cbp9OyCwpLW6tugz6v98vHzs6/wnZfqamH1v7TuiCzynir0rxzpZDbkNjXsfjH5z3Pwky7zpyHoVz3qcjd/pfNumvJdkPDV4fuXrkSErk2WtfXbuDFVq1u1tUPHt0Fqtn3B27mrw/fD38pOpI5OkdJHlbdUrms3oGlOnas+n4COw6vtj68yAAAE5klEQVR4nO2YbXuiRhSGEUmUDOIiEYIaFYMm3W2aRHzttt22202yb92SZRu37f//HR3RoDIDgsPIh537S74Qrvt6zuHMGTmOwWAwGAwGg8FgMBgMBmP/jBoVyPEoa48FjdNxbyrrut6EwD9qq9c9Pc7SqDJpm7KlglLOpwRUSzank4y8KpOcDn3WhHwxaKafdyt7V+q0gQpQnxVALbU7e1Uam00ZE1EgMLnZGu9NqdOKDmmFrE5P96J03GvGVPK09LMGfaexLMdXmqPmaIc1altbeykIUM+oOp2aalIlSEmdUixhx0rQTeuoJrVhOkleOt+qRelYJHCSS5SSOrN2VcoBWtXrEjiplJzGJDlROporkUcdXAuADAG4pQE0KeXUyEXMAtkqmdN2D9KemsAKDHxqOXHtsJlZApbeHlf82diojKf6+jQDOq0J1Q1zkmXczjRebRHgnJZTI6ShQLOFP2tHndxipoEmtfWzhd8L1FbEZtktAZo5cR1s8UrNXuTJUTFVYFHLaWTivjwAti7gbUDv6vAjbmwCefvmNqLnVD15mUP6HOQyvW9y16Lw03mwn8B+rgOhXIiC8PMvrzacrIydLssCRPx13cqaZOvE/SYKHr+vGgtMM3aqXiylhNd/lJ6Kl22Tc9zNk5MglN8sSkj5whSD71ZSgvDSC8rcw403mpN1KeH1+aucmnWXc9WysAGcDXrmPyHeBKQE4U3Wn16gpTzEm9CHD+JDJPU8KCW+uAx7tniUj8stiVP1e0TqeejD8aUKdyRSlxeI1A8pSOXviwRSV8GOEsrXaUjlSZoKI3WVitRbAqkb5OMrVzOXukalwh9OIFV4xqS+VSlajU4kRWskpC2VzvAkGQm0jhkiKUoHMpkUrdXlnmihQpe8cuiSVzwq4MFIkWwJyDosiu/sUKnDEO6CTgWiJS94cRBfvOe1WsJ3FFGpD0RSm1cs8eOfPC8NE77iAKneEcmY4jabSvzEz6n3k73iEGmqI7KLw9pBIwrvPCfeSBjVPdrpZE6rHzi80i2tEkX1FpkUpC3l/xQk/uU78YqT5AW3SFBEJ5/HVXm9dAuS9PozzJgibCnO+/7mk2ADYxD3v4t5NCiyKeVxLa61k1/BuFZo8YgHwpzqyaegEpSKORc+YIpXIDpjljwYqBS0ipPVZ5zT5xScuFpdwVnx7tb/xOVEuLb4uBJGCna7HX0KHtzhnMiH1JIZ3kqaRYXlfkE/vDz5EePTxzrBEhpOSGfV3Lom8X+jVqkFxXFDfFQwLAWnVXtwFGXedo/oMppWUBAnzIpXNMN2B/6AqPUHw5lmLD8N7UvgNC4cpucEC4j7Ap/iMuozxx5CbMepS8bao9LXDavCXRozymcQGtUiL0XyUILuivJYoFO8OdgRGgPF+Me/OpCvB0GGO1rxxlMJ05nlm9i7WklfvdmQxnaAsnNWivYIr3+3qTY5uRUv/ZtP98NbwzUiJkMk2n+0nOBkqEePhhCUxJfFRNScHUooSdvXHDIepKRhGU7C6+sODGwtSWdJPNXS+bgzKa6WxNv0Y1pQG85ifYdS6MJFB9fht8SlGPW9peQzGMLtMsRLUQzNedi7kkd/6NQVY9NMkQyJn9lu0t/WUvVyh/ZM0XykmTN0B1karej3B3OyKRiDwWAwGAwGg8FgMBiMb5v/ARN9jjkCT9iuAAAAAElFTkSuQmCC'
                />
                <span className='ml-2'>Tiếp tục với Google</span>
              </button>
            </div>

            
            {/* <div>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'></div>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className='px-2 bg-white text-gray-500'>Hoặc đăng nhập với email</span>
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Nhập email của bạn'
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Mật khẩu
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Nhập mật khẩu'
                  />
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                    Quên mật khẩu?
                  </a>
                </div>
              </div>

              <div>
                <button className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300'>
                  Đăng nhập
                </button>
              </div>
            </div> */}

            {/* Footer */}
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Chưa có tài khoản?{' '}
                <a href='#' className='font-medium text-blue-600 hover:text-blue-500'>
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
