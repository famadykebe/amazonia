import axios from 'axios';

const apiServerRequet = axios.create({
    baseURL: 'http://localhost:4000'
})

// apiServerRequet.interceptors.request.use(req => {
  
// });

// apiServerRequet.interceptors.response.use(res => {
   
// })

export default apiServerRequet