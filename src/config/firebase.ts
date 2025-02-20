import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyChJOJAzlCH6ZtHv-WYsE9qzTLlwJ9dzEk',
  authDomain: 'kid-programming-edu.firebaseapp.com',
  projectId: 'kid-programming-edu',
  storageBucket: 'kid-programming-edu.firebasestorage.app',
  messagingSenderId: '342520905080',
  appId: '1:342520905080:web:d746106e7010762df51c8d',
  measurementId: 'G-HL7P6GRBNL'
}

const app = initializeApp(firebaseConfig)
const googleProvider = new GoogleAuthProvider()
const auth = getAuth()
const storage = getStorage()

export { googleProvider, auth, storage, app }
