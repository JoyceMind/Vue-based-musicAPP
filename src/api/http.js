import axios from "axios";

// 创建axios实例化
// http://localhost:3000/personalized
const service = axios.create({
    baseURL:"",
    timeout:30000,
    headers:{
        "Content-Type":"application/json;charset=UTF-8",
    }
})


service.interceptors.request.use(
    config=>{
        return config;
    },
    error=>{
        console.log("axios报错中request",error);
        Promise.reject(error);
    }
)


service.interceptors.response.use(
    config=>{
        return config.data;
    },
    error=>{
        console.log("axios报错中response",error);
        Promise.reject(error);
    }
)

export default service;