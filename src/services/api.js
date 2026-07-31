import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
}

export const symptomAPI = {
  analyze: (symptoms) => api.post('/symptoms/analyze', { symptoms }),
}

export const reportAPI = {
  upload: (formData) =>
    api.post('/reports/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  analyze: (reportId) => api.post(`/reports/${reportId}/analyze`),
  list: () => api.get('/reports'),
}

export const prescriptionAPI = {
  analyze: (formData) =>
    api.post('/prescription/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

export const reminderAPI = {
  list: () => api.get('/reminders'),
  create: (data) => api.post('/reminders', data),
  update: (id, data) => api.put(`/reminders/${id}`, data),
  delete: (id) => api.delete(`/reminders/${id}`),
}

export const timelineAPI = {
  list: () => api.get('/timeline'),
}

export const doctorAPI = {
  list: (params) => api.get('/doctors', { params }),
}

export const appointmentAPI = {
  list: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
  cancel: (id) => api.delete(`/appointments/${id}`),
}

export default api
