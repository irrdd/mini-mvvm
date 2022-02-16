interface Options {
    el: string,
    data?: Object,
    methods?: Object,
    computed?: Object,
    watch?: Object
}
interface ObserverData extends Object {
    [x: string]: any;
    __proto__:any

}
export { Options,ObserverData}