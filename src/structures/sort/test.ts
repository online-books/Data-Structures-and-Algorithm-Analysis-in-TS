import selectSort from './select';

describe.only('排序算法',()=>{
    test('选择排序',()=>{
        const arr=[5,3,45,7,8,9,32,2,1];
        const result=selectSort(arr);
        expect(result[0]).toBe(1);
    })
})