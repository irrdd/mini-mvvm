
/**
 * @todo 判断是否是元素节点
 * @param {Element} node 
 * @return {boolean}
*/
function isElementNode(node: Element): boolean {
    return node.nodeType === Node.ELEMENT_NODE
}
/**
 * @todo 创建文档碎片，将元素节点依次放入文档碎片后返回
 * @param {Element} element 
 * @return {DocumentFragment} fragment 文档碎片
*/
function node2Fragment(element: Element): DocumentFragment {
    let fragment: DocumentFragment = document.createDocumentFragment()
    let child
    while (child = element.firstChild) {
        fragment.appendChild(child)
    }
    return fragment

}


export {
    isElementNode,
    node2Fragment
}