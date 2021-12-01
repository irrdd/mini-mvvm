import { mvvm } from '../Interfaces/objectType';
import UpdaterUtil from './updaterUtil'
let updaterUtil = new UpdaterUtil

/**
 * @todo 页面渲染所需的工具函数
*/
class CompileUtil {
    /**
* @todo 判断是否是元素节点
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @return {null}
*/
    text(node: Element, vm: mvvm, express: string): void {
        this.bind(node, vm, express, 'text');
    }

    /**
* @todo 执行更新页面函数并绑定watcher
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {string} dir 
* @return {null}
*/
    bind(node: Element, vm: mvvm, express: string, dir: string): void {
        console.log(dir);
        let updateFn = updaterUtil[dir + 'Updater']
        updateFn && updateFn(node,this.getVMVal(vm,express))
    }
    /**
* @todo 执行更新页面函数并绑定watcher
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {string} dir 
* @return {null}
*/
    getVMVal(vm: mvvm, express: string): unknown {
        let val: unknown = vm
        let expressLIst: string[] = express.split('.')
        expressLIst.forEach((key: string) => {
            val = val[key]
        })
        return val


    }
}
export default CompileUtil