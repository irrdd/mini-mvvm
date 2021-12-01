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
* @todo 渲染元素节点
* @param {Element} node 
* @param {mvvm} vm 
* @return {null}
*/
    compileEle(node: Element, vm: mvvm): void {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach((attr) => {
            let attrName = attr.name
            if (verdictUtil.isDirective(attrName)) {
                let express = attr.value
                let regex = /^v-(.+)$/
                regex.test(attrName)
                let dir = RegExp.$1.trim()
                this[dir] && this[dir](node, vm, express)


            }
        })
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
        let updateFn = updaterUtil[dir + 'Updater']
        updateFn && updateFn(node, this.getVMVal(vm, express))
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
}
export default CompileUtil