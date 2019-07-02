import {

    maxCommonFactor,
    maxSubSumByN,
    maxSubSumByNlogN,
    pow,
    powByRecursive,
} from './index';

describe('runtime',()=>{
    test('最大子序列的和',()=>{
        const arr=[4,-5,6,3,-9,8];
        expect(maxSubSumByN(arr)).toBe(9);
        expect(maxSubSumByNlogN(arr, 0, arr.length - 1)).toEqual(9);
    });
    test('最大公因数',()=>{
        expect(maxCommonFactor(15,5)).toBe(5);
    });
    test('求幂运算',()=>{
        expect(pow(5,6)).toBe(powByRecursive(5,6));
    })
})