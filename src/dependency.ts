import Watch from "./watcher";
class Dependency {
    id: number;
    subs: Watch[]
    target: Watch | null;
    constructor(id: number) {
        this.id = id
    }

}
export default Dependency