let id = 0;
class Dependency {
    constructor() {
        this.id = id++;
        this.subs = [];
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    depend() {
        this.target.addDep(this);
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    addSub(sub) {
        this.subs.push(sub);
    }
    /**
* @todo 遍历data中数据，添加观察者
* @param {Object} data 传入的data
*/
    notify() {
        this.subs.forEach((sub) => {
            sub.update();
        });
    }
}
export default Dependency;
