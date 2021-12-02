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
* @todo 判断是否是事件指令
* @param {string} dir 
* @return {boolean}
*/
    isEventDirective(dir: string): boolean {
        let regex = /^(on|bind).+$/
        return regex.test(dir)
    }
    /**
* @todo 判断是否是有@和：的语法糖
* @param {string} attrName 
* @return {boolean}
*/
    isSugar(attrName: string): boolean {
        let regex = /^(@|:).+$/
        return regex.test(attrName)
    }
}



export default VerdictUtil