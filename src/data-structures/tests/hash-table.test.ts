import HashTable from "../hash-table";

describe("hash table", () => {
  const hashTable = new HashTable(100);
  test("hash table size", () => {
    expect(hashTable.size).toBe(100);
  });
});
