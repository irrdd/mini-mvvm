import * as compileUtil from './utils/compileUtil'
class Compile {
    private $vm?: Object
    private $element: Element
    private $fragment: DocumentFragment
    constructor(el: string, vm: Object) {
        this.$vm = vm;
        this.$element = document.querySelector(el)
        if (this.$element) {
            this.$fragment = this.node2Fragment(this.$element)
            this.init()
            this.$element.appendChild(this.$fragment)
        }




    }
    init(): void {

    }
    /**
* @todo 对文档碎片进行操作
* @param {Element} node 
* @return {null} 
*/
    compileElement(node: Element): void {

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
