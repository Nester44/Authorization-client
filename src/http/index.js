import axios from 'axios'

export const BASE_URL = 'https://authorization-application.herokuapp.com/api'

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config) => config, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    try {
      const response = await axios.get(`${BASE_URL}/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      return $api.request(originalRequest)
    } catch (error) {
      console.log('Unauthorized');
      return error
    }
  }
  throw error;
})

export default $api