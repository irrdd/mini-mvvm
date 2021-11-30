import { Options } from './interface';
class MVVM {
    [x: string]: any;

    $options: Object
    $data?: Object
    $method?: Object
    $compute?: Object
    $watch?: Object

    constructor(options: Options) {
        this.$options = options
        this.$data = options.data
        this.$method = options.method
        this.$compute = options.compute
        this.$watch = options.watch
        let self = this;
        Object.keys(this.$data).forEach(key => {
            self.proxyData(key)
        })

    }
    /**
     * @todo 实现数据代理，将this.$data中的数据代理到this上
     * @param {String} key 传入的键
     * @return {null}
    */
    proxyData(key: string): void {
        let self = this;
        Object.defineProperty(self, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter(): unknown {
                // console.log('得到值');

                return self.$data[key];
            },
            set: function proxySetter(newValue: unknown): void {
                // console.log('改变值');

                self.$data[key] = newValue;
            }
        })
    }
    /**
  * @todo 处理计算属性
  * @return {null}
 */
    initComputed(): void {

    }

}


export default MVVM

