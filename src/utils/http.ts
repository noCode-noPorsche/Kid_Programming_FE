/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:6748/api/',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(this.handleBefore.bind(this), this.handleError)
  }

  private handleBefore(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem('token')?.replace(/"/g, '')
    console.log(token)
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }

  private handleError(error: any) {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
}

const http = new Http().instance
export default http
