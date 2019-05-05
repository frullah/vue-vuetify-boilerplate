import axios from 'axios'

const api = axios.create({
  baseURL: `${location.protocol}//${location.hostname}:3000`
})

export default api
