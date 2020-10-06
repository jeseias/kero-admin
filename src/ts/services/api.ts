import axios from 'axios'

// API
export default axios.create({
  baseURL: false ? 'https://kero-app.herokuapp.com/api/v1/' : 'http://127.0.0.1:5000/api/v1/'
})