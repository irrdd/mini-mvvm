class MVVM{
    a:number
    b:number
    constructor(a:number,b:number){
        
        this.a = a
        this.b = b
        
    }
log(){
    console.log(this.a+this.b);

}    


}
let mvvm = new MVVM(1,0)
mvvm.log()
