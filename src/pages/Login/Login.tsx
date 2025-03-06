import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'
import path from '../../constants/path'
import http from '../../utils/http'

function Login() {
  const navigate = useNavigate()
  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const credential = GoogleAuthProvider.credentialFromResult(result)

      if (!credential) throw new Error('Không lấy được credential')

      const token = await result.user.getIdToken() // Lấy token từ Firebase
      // console.log('ID token firebase:', token)

      // Gửi token lên backend để xác thực
      // Đợi API từ backend, tạm thời comment
      const response = await http.post('auth/login-google', { idToken: token })
      const data = response.data.data.token
      // const tokenFromApi = data.token
      console.log(data)
      localStorage.setItem('token', data)

      navigate(path.home)
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error)
    }
  }
  return (
    <div className='relative w-full min-h-screen bg-gray-100'>
      {/* Ảnh nền */}
      <div className='relative w-full h-80'>
        <img
          className='w-full h-full object-cover'
          src='https://wp.rrdevs.net/edcare/wp-content/themes/edcare/assets/img/bg-img/page-header-bg.png'
          alt='Background'
        />
        {/* Nội dung tiêu đề */}
        <div className='absolute top-1/2 left-10 transform -translate-y-1/2'>
          <h1 className='text-4xl font-bold text-gray-900'>My account</h1>
          <p className='text-lg text-gray-600 mt-2'>
            <span className='text-black hover:text-teal-700 font-medium'>Home / </span>
            <span className='text-teal-600 font-medium'>My account</span>
          </p>
        </div>
      </div>

      {/* Phần đăng nhập */}
      <div className='flex bg-white justify-center items-center mt-12'>
        <div className=' p-8 w-full max-w-md'>
          <h1 className='text-2xl font-bold text-center mb-6 text-gray-900'>Login to your account</h1>

          {/* Email 
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-1'>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500'
            />
          </div>

         
          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-1'>
              Password <span className='text-red-500'>*</span>
            </label>
            <input
              type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500'
            />
          </div>
          <button className='w-full mt-5 bg-teal-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-teal-700 transition'>
            Log in
          </button>
          */}
          <button
            onClick={handleLoginGoogle}
            className='flex items-center justify-center w-full border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-100 transition'
          >
            <img
              alt=''
              className='w-12 h-12'
              src='data:image/png;base64,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'
            />
            <span className='text-gray-700 font-medium'>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
