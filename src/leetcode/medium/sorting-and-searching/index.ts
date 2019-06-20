/**
 * Sort Colors
 * Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.
 * @param nums 
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

export function searchMatrix(matrix: number[][], target: number): boolean {
    let row = matrix.length - 1;
    if (row < 0) {
        return false;
    }
    let column = matrix[0].length - 1;
    if (matrix[row][column] < target) {
        return false;
    }
    while (row >= 0 && column >= 0) {
        const value = matrix[row][column];
        if (value > target) {
            if (row) {
                row -= 1;
            } else {
                column -= 1;
            }
        } else if (value === target) {
            return true;
        } else {
            for (let i = 0; i < column - 1; i++) {
                if (matrix[row + 1][i] === target) {
                    return true;
                }
            }
            for (let j = 0; j < row - 1; j++) {
                if (matrix[j][column + 1] === target) {
                    return true;
                }
            }
            return false;
        }
    }
    return false;
}