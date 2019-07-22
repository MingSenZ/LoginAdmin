//包含所有的请求接口的函数:接口请求函数
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

const BASE = ''
//请求登陆接口函数
export function reqLogin(username, password) {
    const PATH = 'http://localhost:3000'
    //在3000的端口想要从5000端口的后台获取数据,会产生跨域问题,需要配置代理
    return ajax({
        method: 'post',
        url: PATH + '/login',
        data: {
            //axios发送请求 携带的参数data 若是一个对象,则默认以json格式携带参数数据
            username,
            password
        }
    })
}

// const username = 'admin'
// const password = 'admin'
// //传参的本质 : 是将实参存储的数据赋值给形参
// reqLogin(username, password).then(result => { // response.data的值
//     // const result = response.data
//     console.log('请求成功了', result)
// })


export const reqWeather = city => {
    //发送jsonp请求weather的数据
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
        jsonp(url, {}, (err, data) => {
            if (!err && data.error === 0) {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather });
            } else {
                message.error('获取天气失败')
            }
        })

    })
}


// export const reqCategorys = () => ajax(BASE + '/manage/category/list')   //直接返回一个发送 ajax的函数
    //请求所有分类
export const reqCategorys = () => ajax(BASE + '/manage/category/list')


export const reqAddCategory = (categoryName) => {
    const url = BASE + '/manage/category/add'
    return ajax({
        url,
        method: 'POST',
        data: {
            categoryName
        }
    })
}


export const reqUpdateCategory = ({ categoryId, categoryName }) => {
    const url = BASE + '/manage/category/update'
    return ajax(
        {
            url,
            method: 'POST',
            data: {
                categoryId,
                categoryName,
            }
        }
    )
}




//请求商品
export const reqProducts = (pageNum, pageSize) => ajax(BASE + 'manage/product/list', {
    params: {
        pageNum,
        pageSize
    }
})




// 根据ID获取分类
/* export const reqCategory = (categoryId) => {
    return ajax(BASE + ' /manage/category/info', {
        params: { categoryId }
    })
} */
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {
    params: {
        categoryId
    }
})





// 根据名称/描述 搜索产品分页列表
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType }) => {
    const base = ''
    return ajax.get(base + '/manage/product/search', {
        params: {
            pageNum,
            pageSize,
            [searchType]: searchName
        }
    })
}


//  对商品进行上架下架处理
export const reqUpdateStatus = (productId, status) => {
    return ajax.post(BASE + '/manage/product/updateStatus', {
        productId,
        status
    })
}









