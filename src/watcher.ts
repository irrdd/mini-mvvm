import { mvvm } from '../type/objectType';
class Watch{
    callback:Function
    vm:mvvm
    expOrFn:string|Function
    getter:Function
    constructor(vm:mvvm,expOrFn:(string|Function),callback:Function){
        this.callback = callback;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.getter = typeof expOrFn === 'function' ? expOrFn:this.parseGetter(expOrFn.trim());
    }
    parseGetter(express:string){

        return (obj)=>{

        }
    }
}
export  default Watch