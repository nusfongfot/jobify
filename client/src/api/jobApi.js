import axios from '../services/axios'

export const createJob = (data) => axios.post('/api/v1/jobs', data)
export const getAllJobs = () => axios.get('/api/v1/jobs')
