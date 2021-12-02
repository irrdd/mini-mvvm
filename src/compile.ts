import VerdictUtil from './utils/verdictUtil'
import UpdaterUtil from './utils/updaterUtil'
import MVVM from './index'
import CompileUtil from './utils/compileUtil'
let verdictUtil = new VerdictUtil
let updaterUtil = new UpdaterUtil
let compileUtil = new CompileUtil
/**
* @todo 渲染模板类
* @param { string } el 
* @param {MVVM} vm MVVM实例

*/
class Compile {
    $vm: MVVM
    $element: Element
    $fragment: DocumentFragment
    constructor(el: string, vm: MVVM) {
        this.$vm = vm;
        this.$element = document.querySelector(el)
        if (this.$element) {
            this.$fragment = this.node2Fragment(this.$element)
            this.init()
            this.$element.appendChild(this.$fragment)
        }
    }
    init(): void {
        this.compileElement(this.$fragment)
    }
    /**
* @todo 对文档碎片进行操作
* @param {DocumentFragment | Element} node 元素节点

*/
    compileElement(fragment: DocumentFragment | Element): void {
        let childNodes = fragment.childNodes
        let self = this
        Array.from(childNodes).forEach((node: Element) => {
            let text = node.textContent
            let regex = /\{\{(.*)\}\}/
            if (verdictUtil.isElementNode(node)) {
                this.compile(node, this.$vm)
            } else if (verdictUtil.isTextNode(node) && regex.test(text)) {
                compileUtil.text(node, this.$vm, RegExp.$1.trim())

            }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    }

    /**
* @todo 渲染元素节点
* @param {Element} node 元素节点
* @param {MVVM} vm MVVM实例
* @return {null}
*/
    compile(node: Element, vm: MVVM): void {
        let nodeAttrs = node.attributes
        Array.from(nodeAttrs).forEach((attr) => {
            let attrName = attr.name
            if (verdictUtil.isDirective(attrName)) {
                let express = attr.value
                let regex = /^v-(.+)$/
                regex.test(attrName)
                let dir = RegExp.$1.trim()
                if (verdictUtil.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, vm, express, dir)
                } else {
                    compileUtil[dir] && compileUtil[dir](node, vm, express)
                }
            }
            // 判断是否是语法糖
            if (verdictUtil.isSugar(attrName)) {
                let express = attr.value
                let regex = /^(@|:)(.+)$/
                regex.test(attrName)
                let eventType = RegExp.$2.trim()
                let eventName = RegExp.$1.trim()
                compileUtil.eventHandlerSugar(node, vm, express, eventType, eventName)
            }
            node.removeAttribute(attrName)
        })
    }
    /**
 * @todo 创建文档碎片，将元素节点依次放入文档碎片后返回
 * @param {Element} element 元素节点
 * @return {DocumentFragment} fragment 文档碎片
*/
    node2Fragment(element: Element): DocumentFragment {
        let fragment: DocumentFragment = document.createDocumentFragment()
        let child
        while (child = element.firstChild) {
            fragment.appendChild(child)
        }
        return fragment

    }
}
export default Compile
