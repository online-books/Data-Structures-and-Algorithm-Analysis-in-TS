function F(x:number):number{
    if(x===0){
        return 0;
    }
    return 2*F(x-1)+x*2
}