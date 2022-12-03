import axios, { AxiosRequestConfig } from 'axios'

const hostName = 'localhost'
const port = 3000

export const axiosInstance = axios.create({
  baseURL: `http://${hostName}:${port}/api/`,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }

  return config
})
