/**
 * @todo 进行一系列判断的工具函数
*/
class VerdictUtil {
    /**
     * @todo 判断是否是元素节点
     * @param {Element} node 
     * @return {boolean}
    */
    isElementNode(node: Element): boolean {
        return node.nodeType === Node.ELEMENT_NODE
    }
    /**
     * @todo 判断是否是文本节点
     * @param {Element} node 
     * @return {boolean}
    */
    isTextNode(node: Element): boolean {
        return node.nodeType === Node.TEXT_NODE
    }
    /**
 * @todo 判断是否是v-开头的描述符
 * @param {string} attrName 
 * @return {boolean}
*/
    isDirective(attrName: string): boolean {
        let regex = /^v-.+$/
        return regex.test(attrName)
    }
    /**
* @todo 判断是否是v-开头的描述符
* @param {string} attrName 
* @return {boolean}
*/
    isEventDirective(attrName: string): boolean {
        let regex = /^on.+$/
        return regex.test(attrName)
    }
}



export default VerdictUtil