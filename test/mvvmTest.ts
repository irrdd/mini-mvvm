import MVVM from "../src";
import {Options} from '../src/interface';

let options:Options = {
    el:'app',
    data: {
        name: '测试'
    }
}
let mvvm = new MVVM(options);

console.log(mvvm);
console.log(mvvm.name);
mvvm.name = '改变后'
console.log(mvvm.name);


