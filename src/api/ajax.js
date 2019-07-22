//封装能发送ajax请求的函数 
import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'


//因为后台可能只支持urlencoded的方式的传参,不支持json格式的传参,axios默认的采用json格式的传参
// 添加一个请求拦截器 :在真正的请求发出去之前触发
axios.interceptors.request.use(function (config) {
    // console.log(config)
    //在请求时传入的参数 
    const { data, method } = config
    if (method.toLowerCase() === 'post' && typeof data === 'object') {
        //将json格式修改为urlencoded格式
        config.data = qs.stringify(data)
    }
    // console.log(config)

    return config;
});

// 添加一个响应拦截器  在请求的回调之后,在我们制定的回调函数之前
axios.interceptors.response.use(function (response) {
    // 对响应的数据进行处理   
    //让前端直接可以获取到数据data
    return response.data
}, function (error) {
    message.error(error.message)
    return new Promise(() => { })
    //promise 的初始状态为pending状态,这样如果状态不修改,
    // 则无法继续执行后面的代码 , 因此起了终端promise的作用
});



export default axios 