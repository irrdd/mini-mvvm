import MVVM from "../src";
import { Options } from '../type/dataType';

let options: Options = {
    el: '#app',
    data: {
        name: '测试',
        person: {
            name: 'John',
            age: '34',
            sex: 'male'
        },
        html: '<span>John</span>',
        class:'one',
        boolean: true

    },
    computed: {
        one() {
            return '返回计算属性'
        },
        two: {
            get(): String {
                return '自定义get'

            },
            set(newValue: unknown) {
                console.log(newValue);

            }
        }
    },
    methods: {
        test() {
            console.log('事件绑定');

        },
        hover(){
            console.log('鼠标移动');

        }
    }
}
let mvvm = new MVVM(options);
mvvm.person.sex = '加入观察者后'
console.log(mvvm.one);
// console.log(mvvm);










