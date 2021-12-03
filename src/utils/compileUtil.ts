import MVVM from '../index'
import UpdaterUtil from './updaterUtil'
import Watcher from '../watcher'
let updaterUtil = new UpdaterUtil

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
        new Watcher(vm, express, (value, oldValue) => {
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
* @todo 处理v-model指令
* @param {Element} node 
* @param {MVVM} vm 
* @param {string} express 
* @return {null}
*/
    model(node: Element, vm: MVVM, express: string): void {
        this.bind(node, vm, express, 'model');
        let self = this
        let value = this.getVMVal(vm, express)
        node.addEventListener('input', (event) => {
            let newValue = event.target['value']
            if (value === newValue) {
                return

            }
            self.setVMVal(vm, express, newValue)
            value = newValue
        })
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
    eventHandlerSugar(node: Element, vm: MVVM, express: string, attrName: string): void {
        let regex = /^(@|:)(.+)$/
        regex.test(attrName)
        let eventType = RegExp.$2.trim()
        let eventName = RegExp.$1.trim()
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
            node.addEventListener(dir, fn.bind(vm), false);
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
        node.setAttribute(dir, this.getVMVal(vm, express) as string)
        let self = this;
        new Watcher(vm, express, (value, oldValue) => {
            node.setAttribute(dir, value)
        })
    }
    /**
* @todo 获取MVVM中data的属性值
* @param {MVVM} vm 
* @param {string} express 
* @return {unknown}
*/
    getVMVal(vm: MVVM, express: string): unknown {
        let value: unknown = vm
        let expressList: string[] = express.split('.')
        expressList.forEach((key: string) => {
            value = value[key]
        })
        return value
    }
    /**
* @todo 设置MVVM中data的属性值
* @param {MVVM} vm 
* @param {string} express 
* @return {unknown}
*/
    setVMVal(vm: MVVM, express: string, newValue: unknown): void {
        let value: unknown = vm
        let expressList: string[] = express.split('.')
        expressList.forEach((key: string, index: number) => {
            if (index < expressList.length - 1) {
                value = value[key]
            } else {
                value[key] = newValue
            }
        })
    }
}
export default CompileUtil