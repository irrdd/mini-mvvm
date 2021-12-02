import { mvvm } from '../Interfaces/objectType';
import UpdaterUtil from './updaterUtil'
import VerdictUtil from './verdictUtil'
let updaterUtil = new UpdaterUtil
let verdictUtil = new VerdictUtil

/**
 * @todo 页面渲染所需的工具函数
*/
class CompileUtil {
    /**
* @todo 执行更新页面函数并绑定watcher
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {string} dir 
* @return {null}
*/
    bind(node: Element, vm: mvvm, express: string, dir: string): void {
        let updateFn = updaterUtil[dir + 'Updater']
        updateFn && updateFn(node, this.getVMVal(vm, express))
    }

    /**
* @todo 渲染文本节点
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @return {null}
*/
    text(node: Element, vm: mvvm, express: string): void {
        this.bind(node, vm, express, 'text');
    }
    /**
* @todo 处理v-html指令
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @return {null}
*/
    html(node: Element, vm: mvvm, express: string): void {
        this.bind(node, vm, express, 'html');
    }

    /**
* @todo 处理事件指令
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {dir} express 
* @return {null}
*/
    eventHandler(node: Element, vm: mvvm, express: string, dir: string): void {
        let eventType = dir.split(':')[1];
        let fn = vm.$methods && vm.$methods[express]
        if (eventType && fn) {
            node.addEventListener(eventType, fn)
        }
    }
    /**
* @todo 处理语法糖的事件指令
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {dir} express 
* @return {null}
*/
    eventHandlerSugar(node: Element, vm: mvvm, express: string, dir: string): void {
        let fn = vm.$methods && vm.$methods[express]
        if (dir && fn) {
            node.addEventListener(dir, fn)
        }
    }
    /**
* @todo 处理语法糖的普通指令
* @param {Element} node 
* @param {mvvm} vm 
* @param {string} express 
* @param {dir} express 
* @return {null}
*/
    bindHandlerSugar(node: Element, vm: mvvm, express: string, dir: string): void {
        console.log('处理普通指令的语法糖');
        
    }
    /**
* @todo 获取mvvm中data的属性值
* @param {mvvm} vm 
* @param {string} express 
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