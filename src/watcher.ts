import MVVM from './index'
import Dependency from './dependency'
class Watcher {
    callback: Function
    vm: MVVM
    expOrFn: string | Function
    getter: Function
    value: unknown
    dependency: Dependency
    constructor(vm: MVVM, expOrFn: (string | Function), callback: Function) {
        this.callback = callback;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.dependency = new Dependency()
        this.getter = typeof expOrFn === 'function' ? expOrFn : this.parseGetter(expOrFn.trim());
        this.value = this.get()

    }
    get() {
        this.dependency.target = this
        let value = this.getter.call(this.vm, this.vm.data)
        this.dependency.target = null;
        return value
    }
    parseGetter(express: string): Function {
        let expressList = express.split('.')
        return (obj: unknown) => {
            expressList.forEach(element => {
                if (!obj) return;
                obj = obj[element];
            })
            return obj;
        }
    }

}
export default Watcher