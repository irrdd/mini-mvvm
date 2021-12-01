import  VerdictUtil from './utils/verdictUtil'
import  UpdaterUtil from './utils/updaterUtil'
import { mvvm } from './Interfaces/objectType';
import  CompileUtil from './utils/compileUtil'
let verdictUtil = new VerdictUtil
let updaterUtil = new UpdaterUtil
let compileUtil = new CompileUtil
class Compile {
    private $vm: mvvm
    private $element: Element
    private $fragment: DocumentFragment
    constructor(el: string, vm: mvvm) {
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
* @param {DocumentFragment | Element} node 
* @return {null} 
*/
    compileElement(fragment: DocumentFragment | Element): void {
        let childNodes = fragment.childNodes
        let self = this
        Array.from(childNodes).forEach((node: Element) => {
            let text = node.textContent
            let regex = /\{\{(.*)\}\}/
            if (verdictUtil.isElementNode(node)) {
                compileUtil.compileEle(node,this.$vm)
            } else if (verdictUtil.isTextNode(node) && regex.test(text)) {
                compileUtil.text(node,this.$vm,RegExp.$1.trim())

            }
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node)
            }
        })
    }
    /**
 * @todo 创建文档碎片，将元素节点依次放入文档碎片后返回
 * @param {Element} element 
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
