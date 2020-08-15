import axios from 'axios'

const DEFAULT_API_CONFIG = {
  url: 'http://localhost:3333',
  //url: 'http://165.227.83.46:3333/',
  //url: 'http://10.0.2.2:3333',
  timeout: 8000,
}

const api = axios.create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
})

const timeout = error => {
  if (error && 'code' in error && error.code === 'ECONNABORTED') {
    error.message = 'Conexão interrompida tente novamente mais tarde.'
  }

  return error
}

api.interceptors.response.use(
  config => config,
  error => Promise.reject(timeout(error)),
)

export default api
