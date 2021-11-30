import MVVM from "../src";
import {Options} from '../src/interface';

let options:Options = {
    el:'app',
    data: {
        name: '测试'
    },
    computed:{
        one(){
            return '返回计算属性'
        },
        two:{
            get():String{
                return '自定义get'
               
            },
            set(newValue: unknown){
                console.log(newValue);
                
            }
        }
    }
}
let mvvm = new MVVM(options);

// console.log(mvvm);
// console.log(mvvm.one);
console.log(mvvm.two);
mvvm.two = '自定义set'
console.log(mvvm.two);




