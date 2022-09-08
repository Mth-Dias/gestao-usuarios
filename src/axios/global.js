import axios from "axios";

axios.defaults.baseURL ='https://backendlaravel-api.herokuapp.com'
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'

const instance = axios.create({
    headers: {
        'Accept': 'application/json',
    }
})

instance.interceptors.request.use(async(config) => {
     try{
         const token = await localStorage.getItem('Authorization')

         if(token){
             config.headers.Authorization = token
         }

         return config
     }
     catch(err){
         console.log(err)
     }
 })

export default instance