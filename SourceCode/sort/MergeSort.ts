/** @format */

function merge(n: number[], tmpArray: number[], leftPos: number, rightPos: number, rightEnd: number) {
    const leftEnd = rightPos - 1
    const elementNum = rightEnd - leftPos + 1
    let tmpPos = leftPos
    while (leftPos <= leftEnd && rightPos <= rightEnd) {
        if (n[leftPos] <= n[rightPos]) {
            tmpArray[tmpPos++] = n[leftPos++]
        } else {
            tmpArray[tmpPos++] = n[rightPos++]
        }
    }
    while (leftPos <= leftEnd) {
        tmpArray[tmpPos++] = n[leftPos++]
    }
    while (rightPos <= rightEnd) {
        tmpArray[tmpPos++] = n[rightPos++]
    }
    for (let i = 0; i < elementNum; i++, rightEnd--) {
        n[rightEnd] = tmpArray[rightEnd]
    }
}

function mSort(n: number[], tmpArray: number[], left: number, right: number) {
    if (left < right) {
        const center = Math.floor((left + right) / 2)
        mSort(n, tmpArray, left, center)
        mSort(n, tmpArray, center + 1, right)
        merge(n, tmpArray, left, center + 1, right)
    }
}

export default function mergeSort(n: number[]): void {
    const tempArr: number[] = new Array(n.length).fill(0)
    mSort(n, tempArr, 0, n.length - 1)
}
