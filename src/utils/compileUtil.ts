import MVVM from '../index'

import UpdaterUtil from './updaterUtil'
import VerdictUtil from './verdictUtil'
import Watcher from '../watcher'
let updaterUtil = new UpdaterUtil
let verdictUtil = new VerdictUtil

/**
 * @todo 页面渲染所需的工具函数
*/
class CompileUtil {
    /**
* @todo 执行更新页面函数并绑定watcher
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @param {string} dir 
* @return {null}
*/
    bind(node: Element, vm: MVVM, express: string, dir: string): void {
        let updateFn = updaterUtil[dir + 'Updater']
        updateFn && updateFn(node, this.getVMVal(vm, express))
        new Watcher(vm, express,(value,oldValue) => {
            updateFn && updateFn(node, value, oldValue)
        })
    }

    /**
* @todo 渲染文本节点
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @return {null}
*/
    text(node: Element, vm: MVVM, express: string): void {
        this.bind(node, vm, express, 'text');
    }
    /**
* @todo 处理v-html指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @return {null}
*/
    html(node: Element, vm: MVVM, express: string): void {
        this.bind(node, vm, express, 'html');
    }

    /**
* @todo 处理事件指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @param {string} dir 元素处理后属性
* @return {null}
*/
    eventHandler(node: Element, vm: MVVM, express: string, dir: string): void {
        let eventName = dir.split(':')[0];
        let eventType = dir.split(':')[1];
        if (eventName === 'on') {
            this.eventOnHandler(node, vm, express, eventType)
        } else {
            this.eventBindHandler(node, vm, express, eventType)
        }
    }
    /**
* @todo 处理语法糖的事件指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @param {string} dir 元素处理后属性
* @return {null}
*/
    eventHandlerSugar(node: Element, vm: MVVM, express: string, eventType: string, eventName: string): void {
        if (eventName === '@') {
            this.eventOnHandler(node, vm, express, eventType)
        } else {
            this.eventBindHandler(node, vm, express, eventType)
        }
    }
    /**
* @todo 处理v-on的事件指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @param {string} dir  
* @return {null}
*/
    eventOnHandler(node: Element, vm: MVVM, express: string, dir: string): void {
        let fn = vm.methods && vm.methods[express]
        if (dir && fn) {
            node.addEventListener(dir, fn)
        }
    }
    /**
* @todo 处理v-bind的事件指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @param {string} dir 
* @return {null}
*/
    eventBindHandler(node: Element, vm: MVVM, express: string, dir: string): void {
        node.setAttribute(dir,this.getVMVal(vm,express) as string)
    }
    /**
* @todo 获取MVVM中data的属性值
* @param {MVVM} vm 
* @param {string} express 
* @return {unknown}
*/
    getVMVal(vm: MVVM, express: string): unknown {
        let val: unknown = vm
        let expressList: string[] = express.split('.')
        expressList.forEach((key: string) => {
            val = val[key]
        })
        return val
    }
}
export default CompileUtil