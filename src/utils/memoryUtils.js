import storageUtils from './storageUtil.js'
let user = storageUtils.getUser()
export default {
    //从本地中获取到user数据,保存到内存中
    user: user,
    product: {}
}