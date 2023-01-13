import axios from '../services/axios'

export const register = (data) => axios.post('/api/v1/auth/register', data)
export const login = (data) => axios.post('/api/v1/auth/login', data)