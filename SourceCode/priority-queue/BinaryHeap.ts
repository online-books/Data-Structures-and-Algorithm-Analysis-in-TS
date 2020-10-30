import { swap } from "@/shared/util";

function percolateDown(list: any[], i: number) {
  while (2 * i <= list.length - 1) {
    let index = 2 * i;
    if (index !== list.length - 1 && list[index] > list[index + 1]) {
      index += 1;
    }
    if (list[i] > list[index]) {
      swap(list, i, index);
    } else {
      break;
    }
    i = index;
  }
}
export default class BinaryHeap<T> {
  private list: T[] = [];
  constructor(data: T[] = []) {
    this.list.push(data[0]);
    this.list.push(...data);
    for (let i = Math.floor(data.length / 2); i > 0; i--) {
      percolateDown(this.list, i);
    }
  }
  public getMin(): T {
    if (!this.size) {
      throw new Error("Binary heap is empty!");
    }
    return this.list[1];
  }
  public deleteMin(): T {
    if (!this.size) {
      throw new Error("Binary heap is empty!");
    }
    const { list } = this;
    const lastIndex = list.length - 1;
    const lastElement = list[lastIndex];
    const minElement = this.list[1];
    let i = 1;
    for (; i <= Math.floor(lastIndex / 2);) {
      let j = i * 2;
      if (j !== lastIndex && list[j] > list[j + 1]) {
        j = j + 1;
      }
      if (list[j] < lastElement) {
        list[i] = list[j];
        i = j;
      } else {
        break;
      }
    }
    list[i] = lastElement;
    list.pop();
    return minElement;
  }
  public insert(data: T) {
    const { list } = this;
    let index = list.push(data) - 1;
    for (; index > 1;) {
      const parentIndex = Math.floor(index / 2);
      if (data < list[parentIndex]) {
        list[index] = list[parentIndex];
      } else {
        break;
      }
      index = parentIndex;
    }
    list[index] = data;
  }
  public get size(): number {
    return this.list.length - 1;
  }
}
