import Watcher from "./watcher";
let id = 0
class Dependency {
    id: number;
    subs: Watcher[]
    target: Watcher | null;
    constructor() {
        this.id = id++
        this.subs = []
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    depend() {
        this.target.addDep(this)
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    addSub(sub: Watcher): void {
        this.subs.push(sub)
    }
        /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    notify():void{
        this.subs.forEach((sub:Watcher) =>{
            sub.update()
        })
    }
}
export default Dependency