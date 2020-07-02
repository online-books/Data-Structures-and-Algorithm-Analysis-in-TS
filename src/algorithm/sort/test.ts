import insertionSort from "./insertion";
import mergeSort from "./merge";
import quickSort from "./quick";
import selectSort from "./select";
import shellSort from "./shell";

function generateTestArray(size: number) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * size);
    arr.push(value);
  }
  return arr;
}

describe("排序算法", () => {
  let arr: number[];
  beforeAll(() => {
    const size = 10000;
    arr = generateTestArray(size);
  });
  afterAll(() => {
    arr.length = 0;
  });
  test("选择排序", () => {
    selectSort(arr);
  });
  test("插入排序", () => {
    insertionSort(arr);
  });
  test("归并排序", () => {
    mergeSort(arr);
  });
  test("希尔排序", () => {
    shellSort(arr);
  });
  test("快速排序", () => {
    quickSort(arr);
  });
});
