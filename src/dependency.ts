import Watcher from "./watcher";
let id = 0
class Dependency {
    id: number;
    subs: Watcher[]
    target: Watcher | null;
    constructor() {
        this.id = id++
    }

}
export default Dependency