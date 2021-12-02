import MVVM from './index'

class Watch{
    callback:Function
    vm:MVVM
    expOrFn:string|Function
    getter:Function
    value:string
    constructor(vm:MVVM,expOrFn:(string|Function),callback:Function){
        this.callback = callback;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.getter = typeof expOrFn === 'function' ? expOrFn:this.parseGetter(expOrFn.trim());
    }
    parseGetter(express:string):Function{
        let expressList = express.split('.')
        return (obj:unknown)=>{
            expressList.forEach(element=>{
                if(!obj) return;
                obj = obj[element];
            })
            return obj;
        }
    }
}
export  default Watch