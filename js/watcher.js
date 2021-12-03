import Dependency from './dependency';
class Watcher {
    constructor(vm, expOrFn, callback) {
        this.callback = callback;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.depIDs = {};
        this.dependency = new Dependency();
        this.getter = typeof expOrFn === 'function' ? expOrFn : this.parseGetter(expOrFn.trim());
        this.value = this.get();
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    get() {
        Dependency.prototype.target = this;
        let value = this.getter.call(this.vm, this.vm);
        Dependency.prototype.target = null;
        return value;
    }
    /**
* @todo 返回能得到表达式对应值的函数
* @param {string} express 表达式
*/
    parseGetter(express) {
        let expressList = express.split('.');
        return (obj) => {
            expressList.forEach(element => {
                if (!obj)
                    return;
                obj = obj[element];
            });
            return obj;
        };
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    addDep(dependency) {
        console.log(dependency.id);
        if (!this.depIDs.hasOwnProperty(dependency.id)) {
            dependency.addSub(this);
            this.depIDs[dependency.id] = dependency;
        }
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    update() {
        let value = this.get();
        var oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.callback.call(this.vm, value, oldValue);
        }
    }
}
export default Watcher;
