
//操作local数据的工具函数 
import store from 'store'
export default {
    saveUser(user) {
        //localstorage只能保存字符串类型的值, 如果不转为特定的字符串则会调用自身的tostring方法
        // localStorage.setItem('user_key', JSON.stringify(user))
       store.set('user_key', user)
    },
    getUser() {
        //因为在使用时,有时需要获取user的身上的属性,所以
       // return JSON.parse(localStorage.getItem('user_key') || '{}')
       return store.get('user_key') || {}
    },
    removeUser() {
        // localStorage.removeItem('user_key')
        store.remove('user_key')
    }
}