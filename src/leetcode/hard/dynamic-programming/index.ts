/**
 * Maximum Product Subarray
 * Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.
 */

export function maxProduct(nums: number[]): number {
    const {
        length
    } = nums;
    let result = nums[0];
    const getProduct = (max: number, min: number, index: number) => {
        if (index === length) {
            return;
        }
        const val = nums[index];
        if (val < 0) {
            [max, min] = [min, max];
        }
        max = Math.max(val, max * val);
        min = Math.min(val, min * val);
        result = Math.max(result, max);
        getProduct(max, min, index + 1);
    }
    getProduct(result, result, 1)
    return result;
}
