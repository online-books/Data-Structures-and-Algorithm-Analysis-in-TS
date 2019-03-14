/**
 * 问题：Merge Sorted Array
 * 描述：Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
 */

export function merge(nums1: number[], m: number, nums2: number[], n: number): number[] {
    let i = 0;
    let j = 0;
    while (i < m + j && j < n) {
        const v1 = nums1[i];
        const v2 = nums2[j];
        if (v2 > v1) {
            i++;
        } else {
            nums1.splice(m + j, 1);
            nums1.splice(i, 0, v2);
            i++;
            j++;
        }
    }
    while (j < n) {
        nums1.splice(m + j, 1, nums2[j]);
        j++;
    }
    return nums1;
}

/**
 * 问题：First Bad Version
 * 描述：You are a product manager and currently leading a team to develop a new product. 
 * Unfortunately, the latest version of your product fails the quality check. 
 * Since each version is developed based on the previous version, all the versions after a bad version are also bad.
 * Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
 * You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. 
 * You should minimize the number of calls to the API.
 */

interface CheckFunc {
    (version: number): boolean;
}

export function solution(isBadVersion: CheckFunc): Function {
    return (n: number): number => {
        let start = 1;
        let end = n;
        while (true) {
            if (isBadVersion(start)) {
                return start;
            }
            if (!isBadVersion(end)) {
                if (end === n) {
                    return -1;
                } else {
                    return end + 1;
                }
            }
            const middle = Math.floor((start + end) / 2);
            if (isBadVersion(middle)) {
                start = start + 1;
                end = middle - 1;
            } else {
                start = middle + 1;
                end = end - 1;
            }
        }
    }
}