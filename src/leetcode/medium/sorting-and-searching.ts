import { compare, swap } from '@src/share/utils';

function midian3(arr: number[], start: number, end: number): number {
    const middle = Math.floor((start + end) / 2);
    if (arr[start] > arr[middle]) {
        swap(arr, middle, start);
    }
    if (arr[start] > arr[end]) {
        swap(arr, end, start);
    }
    if (arr[middle] > arr[end]) {
        swap(arr, end, middle);
    }
    swap(arr, middle, end - 1);
    return arr[end - 1];
}


/**
 * Sort Colors
 * Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.
 */
export function sortColors(nums: number[]): void {
    const len = nums.length;
    let count = 0;
    for (let i = 0; i < len - count;) {
        const value = nums[i];
        if (value === 2) {
            nums.splice(i, 1);
            nums.push(value);
            count += 1;
            continue;
        }
        if (value === 0) {
            nums.splice(i, 1);
            nums.unshift(value);
        }
        i++;
    }
}


/**
 * Top K Frequent Elements
 * Given a non-empty array of integers, return the k most frequent elements.
 */
export function topKFrequent(nums: number[], k: number): number[] {
    const obj = {};
    for (let i = 0; i < nums.length; i++) {
        const key = nums[i];
        const val = obj[key];
        if (typeof val === 'undefined') {
            obj[key] = 1;
        } else {
            obj[key] = val + 1;
        }
    }
    const keys = Object.keys(obj).sort((key1, key2) => {
        const val1 = obj[key1];
        const val2 = obj[key2];
        return val2 - val1;
    });
    return keys.slice(0, k).map(Number);
}


/**
 * Kth Largest Element in an Array
 * Find the kth largest element in an unsorted array.
 */
export function findKthLargest(nums: number[], k: number): number {
    const {
        length
    } = nums;
    if (length <= 3) {
        return nums.sort(compare)[length - k];
    }
    const start = 0;
    const end = length - 1;
    const pivot = midian3(nums, start, end);
    let i = 1;
    let j = length - 3;
    while (true) {
        while (nums[i] <= pivot && i < end - 1) {
            i++;
        }
        while (nums[j] > pivot) {
            j--;
        }
        if (i < j) {
            swap(nums, i, j);
        } else {
            break;
        }
    }
    swap(nums, i, end - 1);
    if (k < length - i) { // k在数组的右半部分，大于pivot
        return findKthLargest(nums.slice(i + 1), k);
    } else if (k > length - i) { // k在数组的右半部分，大于pivot
        return findKthLargest(nums.slice(start, i), k - (length - i));
    } else {
        return nums[i];
    }
}

