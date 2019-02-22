export default function swap (arr: number[], start: number, end: number) {
    const tmp = arr[start];
    arr[start] = arr[end];
    arr[end] = tmp;
}