import insertionSort from '@/sort/InsertionSort';


function initializeData() {
    return [34, 8, 64, 51, 32, 21]
}

describe('sort', () => {

    let data: number[];
    beforeEach(() => {
        data = initializeData();
    });
    test('Insertion Sort', () => {
        insertionSort(data);
        expect(data[0]).toBe(8);
        expect(data[data.length - 1]).toBe(64);
    });
    test('Shell Sort', () => {
        console.log(data)
    })
})

