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
        boolean: true,
        array:[7,13,26,1,2,3,4,{
            a:1
        }]

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
            this.name = '加入观察者后'
            this.class = 'two'
            // this.array.push(14)
            // this.array[2] = 16
            // this.array.pop()
            // this.array.shift()
            // this.array.splice(1,2,5,7)
            // this.array.sort((a,b)=>{
            //     return a-b
            // })
            this.array[this.array.length - 1].a = 3
            console.log(this.array);
            

        },
        hover(){
            console.log('鼠标移动');
            this.name = '测试'
            this.class = 'one'

        }
    }
}
let mvvm = new MVVM(options);
console.log(mvvm.one);
// console.log(mvvm);










