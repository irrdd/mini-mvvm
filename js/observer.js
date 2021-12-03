import Dependency from './dependency';
/**
* @todo 为数据添加观察者
* @param { Object } data  MVVM中的data
* @param {MVVM} vm MVVM实例
*/
class Observer {
    constructor(data, vm) {
        this.id = 0;
        this.data = data;
        this.vm = vm;
        this.init();
    }
    /**
* @todo 初始化
*/
    init() {
        this.walk(this.data);
    }
    /**
 * @todo 遍历data中数据，添加观察者
 * @param {Object} data 传入的data
*/
    walk(data) {
        if (typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach((key) => {
            this.difineReactive(data, key, data[key]);
        });
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    difineReactive(data, key, value) {
        let dependency = new Dependency();
        console.log('观察者', key, value, dependency.id);
        this.walk(value);
        let self = this;
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                console.log('得到data中数据', key, value);
                dependency.target && dependency.depend();
                return value;
            },
            set: function (newValue) {
                console.log('设置data中数据', newValue);
                if (value === newValue)
                    return;
                value = newValue;
                self.walk(newValue);
                dependency.notify();
            }
        });
    }
}
export default Observer;
