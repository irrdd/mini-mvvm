
import { Options } from './dataType';
interface mvvm {
    [x: string]: any;
    $options: Options
    $data?: Object
    $methods?: Object
    $computed?: Object
    $watch?: Object
    $compile: Object
    $template?: string
    init(): void
    proxyData(): void
    initComputed(): void

}
interface compile {
    $vm?: Object
    $element: Element
    $fragment: DocumentFragment
    init(): void

}


export {

    mvvm,
    compile
}