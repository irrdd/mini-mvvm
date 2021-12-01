
import {Options} from './dataType';
interface mvvm {
    [x: string]: any;
     $options: Options
    $data?: Object
    $method?: Object
    $computed?: Object
    $watch?: Object
    $compile?: Object
    init(): void

}
interface compile {
    $vm?: Object
    $element: Element
    $fragment: DocumentFragment
    init(): void
    proxyData(): void
    initComputed(): void
}

export {
   
    mvvm,
    compile
}