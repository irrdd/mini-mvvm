import Watcher from "./watcher";
let id = 0
class Dependency {
    id: number;
    subs: Watcher[]
    target: Watcher | null;
    constructor() {
        this.id = id++
    }
    depend(){
        this.target.addDep(this)
    }
    addSub(sub: Watcher): void {
        this.subs.push(sub)
    }
}
export default Dependency