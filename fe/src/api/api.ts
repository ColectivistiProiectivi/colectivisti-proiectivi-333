import axios from 'axios'

const hostName = 'localhost'
const port = 8080

const jwtToken = localStorage.getItem('jwtToken')

export const axiosInstance = axios.create({
  baseURL: `http://${hostName}:${port}/`,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  },
})
