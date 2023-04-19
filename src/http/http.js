import axios from 'axios'
import router from '../router'
import store from '../store'


export default () => {

    const api = axios.create({

        baseURL: process.env.VUE_APP_API_URL,
        withCredentials: false,
        'Access-Control-Allow-Credentials': true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${Cookie.get('access_token')}`
        }
    })

    // api.interceptors.request.use(
    //     (config) => {
    //         if(config.method == 'put' || config.method == 'post' || config.method == 'patch'){
    //             store.state.submiting = true
    //         }   
    //         if(config.method == 'get'){
    //             store.state.getting = config.url
    //         }         
    //         config.headers.Authorization = `Bearer ${Cookie.get('access_token')}`;
    //         return config;
    //     },
    //     (error) => {
    //         return Promise.reject(error);
    //     }
    // );
    // api.interceptors.response.use(
    //     response => {
    //         store.state.submiting = false
    //         store.state.getting = false
    //         return response
    //     },
    //     (error) => {
    //         console.log('error from response', error)
    //         store.state.submiting = false
    //         store.state.getting = false
    //         if (error.response.data.error == true) {
    //             router.push('/login');
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return api;

}