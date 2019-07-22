/* 2. reduce() */
Array.prototype.reduce = function (callback, initValue) {
    let total = initValue
    for (let index = 0; index < this.length; index++) {
        total = callback(total, this[index], index)
    }
    return total
}

var result = arr.reduce((pre, item, index) => {
    if (index % 2 === 1 && item % 2 === 1) {
        pre += item
    }
    return pre
}, 0)
console.log(result)

//reduce基本的使用
arr.reduce((pre, item) => {
    //reduce接收两个参数 1.一个回调函数2. 一个初始的值,这个值的指定可以根据想要返回的值来决定

    // pre:上一次统计的结果
    // item:当前的元素
}, pre)

Array.prototype.reduce=function(callback,initValue ){
    let total =initValue
    for(let i=0;index<=this.length-1;i++){
        
    }
}

