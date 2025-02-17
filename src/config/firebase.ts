import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCm9yuioJaw1nj87IJO6fpOVn2wBBKGX94',
  authDomain: 'kid-programing.firebaseapp.com',
  projectId: 'kid-programing',
  storageBucket: 'kid-programing.firebasestorage.app',
  messagingSenderId: '606403100756',
  appId: '1:606403100756:web:1ca330031a180d25f52dc1',
  measurementId: 'G-3NVG5JP2C0'
}


const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
const auth = getAuth()

export { googleProvider, auth }
