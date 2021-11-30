import MVVM from "../src";
import {Options} from '../src/Interfaces/mvvm';

let options:Options = {
    el:'#app',
    data: {
        name: '测试',
        person:{
            name: 'John',
            age: '34',
            sex: 'male'
        }

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

console.log(mvvm.compile);
console.log(mvvm);










