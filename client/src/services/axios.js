import axios from 'axios'
import { API_ENDPOINT_URL } from './env'
import { getAccessToken, removeAccessToken } from './localStorage'

axios.defaults.baseURL = API_ENDPOINT_URL

//Before Send Request
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

//Before Accept Response
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 401) {
      removeAccessToken()
      return window.location.replace('/')
    }
    return Promise.reject(err)
  }
)

export default axios