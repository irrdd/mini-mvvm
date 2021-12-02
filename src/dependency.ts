import Watch from "./watcher";
 class Dependency{
     id:number;
     subs:Watch[]
     constructor(id:number){
        this.id  =id
     }
     
 }
 export default Dependency