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
        this.compileElement( this.$fragment )
    }
    /**
* @todo 对文档碎片进行操作
* @param {DocumentFragment | Element} node 
* @return {null} 
*/
    compileElement(fragment: DocumentFragment | Element): void {
        let childNodes = fragment.childNodes
        let self = this
        Array.from(childNodes).forEach((node: Element)=> {
            let text = node.textContent
            var regex = /\{\{(.*)\}\}/
            if (compileUtil.isElementNode(node)) {
                console.log('匹配元素节点成功');
                
            }else if (compileUtil.isTextNode(node) && regex.test(text)) {
                console.log('匹配文本节点成功');
                
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
