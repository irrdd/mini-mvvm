
const orginalPrototype = Array.prototype

const arrayPrototype = Object.create(orginalPrototype)
console.log(orginalPrototype);

const arrarMethod = ['push', 'pop', 'shift', 'unshift','splice','sort','reverse']

arrarMethod.forEach(method=>{
    arrayPrototype[method]=function(){
        // 调用原生的数组方法
        orginalPrototype[method].apply(this,arguments)
        // 通知数据更新
        // todo 引入Dependency的notify
        console.log('数组数据更新');
        
    }
})

export default arrayPrototype