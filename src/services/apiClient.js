import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not configured')
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong.'
    const apiError = new Error(message)
    apiError.status = error.response?.status
    apiError.detail = error.response?.data?.error

    return Promise.reject(apiError)
  },
)

export default apiClient
