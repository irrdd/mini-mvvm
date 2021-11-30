
/**
 * @todo 判断是否是元素节点
 * @param {Element} node 
 * @return {boolean}
*/
function isElementNode(node: Element): boolean {
    return node.nodeType === Node.ELEMENT_NODE
}



export {
    isElementNode,

}