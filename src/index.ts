import { Options } from '../type/dataType';
import Compile from './compile';
import Observer from './observer';

class MVVM  {
    [x: string]: any;
   private $options: Options
   private $data?: Object
   private $methods?: Object
   private $computed?: Object
   private $watch?: Object
   private $compile: Object
   private $template?: string

    constructor(options: Options) {
        this.$options = options
        this.$data = options.data
        this.$methods = options.methods
        this.$computed = options.computed
        this.$watch = options.watch
        this.init()

    }
    /**
 * @todo 初始化

*/
    init(): void {
        // 数据代理
        this.proxyData()
        // 处理计算属性
        this.initComputed()
        // 添加观察者
        this.$data && new Observer(this.$data, this)
        // 渲染页面
        this.$compile = new Compile(this.$options.el, this)
    }
    /**
     * @todo 实现数据代理，将this.$data中的数据代理到this上
     * @param {string} key 传入的键
    */
    proxyData(): void {
        let self = this;
        Object.keys(this.$data).forEach(key => {
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
        })
    }
    /**
  * @todo 处理计算属性
 */
    initComputed(): void {
        let self = this;
        let computed = this.$computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(self, key, {
                    get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
                    set: typeof computed[key] === 'function' ? () => { } : computed[key].set
                });
            })
        }
    }
    get compile() {
        return this.$compile
    }
    get data() {
        return this.$data
    }
    get methods() {
        return this.$methods
    }
    get computed() {
        return this.$computed
    }
    get watch() {
        return this.$watch
    }
    get options() {
        return this.$options
    }
    get template() {
        return this.$template
    }


}

(window as any).MVVM = MVVM
export default MVVM

