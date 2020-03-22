import axios from 'axios'

export default fetch = axios.create({
   baseURL: 'http://localhost:4000/api/',
})
