import insertionSort from "../../algorithm/sort/insertion";
import mergeSort from "../../algorithm/sort/merge";
import quickSort from "../../algorithm/sort/quick";
import selectSort from "../../algorithm/sort/select";
import shellSort from "../../algorithm/sort/shell";

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
