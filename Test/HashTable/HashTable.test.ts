/** @format */

import HashTable from '@/hash-table/HashTable'
import {generateRandomKeys} from '@/shared/util'

describe('Hash Table', () => {
    const keys: string[] = []
    let hashTable: HashTable<number>
    test('initialization', () => {
        hashTable = new HashTable<number>()
        expect(hashTable).toBeInstanceOf(HashTable)
        expect(hashTable.size).toBe(0)
    })
    test('insert', () => {
        const characters = 'abcdefg'
        const {MAX_SIZE} = hashTable
        const i = 0
        while (hashTable.size < MAX_SIZE) {
            const [key] = generateRandomKeys(characters, 3, 1)
            keys.push(key)
            hashTable.insert(key, i)
        }
        expect(hashTable.size).toEqual(MAX_SIZE)
        expect(() => {
            hashTable.insert('a', 1)
        }).toThrow(Error)
    })
    test('find', () => {
        expect(hashTable.find(keys[0])).not.toBeNull()
        expect(hashTable.find('a')).toBeNull()
    })
    test('delete', () => {
        hashTable.delete(keys[0])
        expect(hashTable.size).toBe(hashTable.MAX_SIZE - 1)
        hashTable.delete('a')
        expect(hashTable.size).toBe(hashTable.MAX_SIZE - 1)
    })
})
