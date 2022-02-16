/**
 * @todo 页面更新所需的工具函数
*/
class UpdaterUtil {
    /**
* @todo 更新文本节点和v-text指令
* @param {Element} node 
* @param {string} value  
*/
    textUpdater(node: Element, value: string): void {
    // todo 模板数组取值 
        node.textContent = typeof value === 'undefined' ? '' : value;
    }
    /**
* @todo 更新v-html指令
* @param {Element} node 
* @param {string} value  
*/
    htmlUpdater(node: Element, value: string): void {
        node.innerHTML = typeof value === 'undefined' ? '' : value;
    }
    /**
* @todo 更新v-model指令
* @param {Element} node 
* @param {string} value  
*/
    modelUpdater(node: any, value: string): void {
        node.value = typeof value === 'undefined' ? '' : value;
    }
}
export default UpdaterUtil