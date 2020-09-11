export default class HashTable {
  private tableList: string[];
  constructor(size: number) {
    this.tableList = new Array(size);
  }
  public get size() {
    return this.tableList.length;
  }
  public find(value: string): number {
    const { size } = this;
    let index = this.hash(value);
    let collisionNum = 0;
    while (this.tableList[index] && this.tableList[index] !== value) {
      index += 2 * ++collisionNum - 1;
      if (index >= size) {
        index -= size;
      }
    }
    return index;
  }
  public insert(value: string): number {
    const index = this.find(value);
    if (!this.tableList[index]) {
      this.tableList[index] = value;
    }
    return index;
  }

  public delete(value: string) {
    const index = this.find(value);
    this.tableList[index] = "";
  }

  private hash(str: string): number {
    let hashVal = 0;
    for (let i = 0, j = str.length; i < j; i++) {
      const point = str.codePointAt(i) as number;
      hashVal = (hashVal << 5) + point;
    }
    return hashVal % this.tableList.length;
  }
}
