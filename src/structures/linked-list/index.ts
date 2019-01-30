
import List from './list';
import Node from './node';



/**
 * 多项式相加
 * @param l1 
 * @param l2 
 */
export function addPolynomial (l1: List, l2: List): List {
    const list = new List();
    if (!l1.size && !l2.size) {
        return list;
    }
    if(!l1.size){
        return l2;
    }
    if(!l2.size){
        return l1;
    }
    let l1Node = l1.first();
    let l2Node = l2.first();
    while (l1Node && l2Node) {
        const power1 = l1Node.value.power;
        const power2 = l2Node.value.power;
        const coeff1 = l1Node.value.coeff;
        const coeff2 = l2Node.value.coeff;
        if (power1 > power2) {
            list.insert({ power: power1, coeff: coeff1 });
            l1Node = l1Node.next;
        } else if (power1 < power2) {
            list.insert({ power: power2, coeff: coeff2 });
            l2Node = l2Node.next;
        } else {
            list.insert({ power: power2, coeff: coeff1 + coeff2 });
            l1Node = l1Node.next;
            l2Node = l2Node.next;
        }
    }
    if (l1Node) {
        while (l1Node) {
            list.insert({
                power: l1Node.value.power,
                coeff: l1Node.value.coeff,
            });
            l1Node = l1Node.next;
        }
    }
    if (l2Node) {
        while (l2Node) {
            list.insert({
                power: l2Node.value.power,
                coeff: l2Node.value.coeff,
            });
            l2Node = l2Node.next;
        }
    }
    return list;
}

/**
 * 多项式相乘
 * @param l1 
 * @param l2 
 */
export function mutiplePolynomial (l1: List, l2: List): List {
    const list = new List();
    const result = {};
    let l1Node;
    let l2Node;
    let parent;
    l1Node = l1.first() as Node;
    l2Node = l2.first() as Node;
    parent = l2Node;
    while (l1Node) {
        while (l2Node) {
            const power1 = l1Node.value.power;
            const power2 = l2Node.value.power;
            const coeff1 = l1Node.value.coeff;
            const coeff2 = l2Node.value.coeff;
            const power = power1 + power2;
            const coeff = coeff1 * coeff2;
            if (result[power]) {
                result[power] += coeff;
            } else {
                result[power] = coeff;
            }
            l2Node = l2Node.next;
        }
        l2Node = parent;
        l1Node = l1Node.next;
    }
    Object.keys(result).forEach((power) => {
        list.insert({
            power: Number(power),
            coeff: result[power],
        })
    });
    return list;

}


/**
 * 基数排序
 * @param arr 
 */
export function radixSort (arr: number[]): number[] {
    const maxNumber = Math.max(...arr);
    const len = String(maxNumber).length;
    let a = 1;
    let result = arr;
    for (let j = 1; j <= len; j++) {
        a *= 10;
        const buckets: number[][] = [];
        for (let i = 0; i < result.length; i++) {
            const value = result[i];
            const index = value % a;
            if (!buckets[index]) {
                buckets[index] = [];
            }
            buckets[index].push(value);
        }
        result = [];
        buckets.forEach(bucket => result.push(...bucket));
    }
    return result;
}

