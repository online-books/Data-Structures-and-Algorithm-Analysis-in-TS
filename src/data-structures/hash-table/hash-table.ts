export default class HashTable {
    protected tableSize: number;
    constructor(size: number) {
        this.tableSize = size;
    }
    protected hash(value: string): number {
        let code = 0;
        for (let i = 0; i < value.length; i++) {
            code += value.codePointAt(i) as number;
        }
        return code % this.tableSize;
        // let hashVal = 0;
        // while(value!=='\0'){
        //     hashVal = (hashVal<<5)+*key++;
        // }
        // return hashVal%this.tableSize;
    }
}