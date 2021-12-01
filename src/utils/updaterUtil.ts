/**
 * @todo 页面更新所需的工具函数
*/
class UpdaterUtil{
    textUpdater(node:Element,value: string){
        node.textContent = typeof value === 'undefined' ? '' :value;    }
}
export  default UpdaterUtil