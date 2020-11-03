/** @format */

import HashTable from '@/hash-table/HashTable'
import {generateRandomKeys} from '@/shared/util'

describe('Hash Table', () => {
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
            hashTable.insert(key, i)
        }
        const keys = hashTable.getKeys()
        console.log(keys.length)
        expect(hashTable.size).toEqual(MAX_SIZE)
        expect(() => {
            hashTable.insert('a', 1)
        }).toThrow(Error)
    })
    test('find', () => {
        const keys = hashTable.getKeys()
        expect(hashTable.find(keys[0])).not.toBeNull()
        expect(hashTable.find('a')).toBeNull()
    })
    test('delete', () => {
        const keys = hashTable.getKeys()
        hashTable.delete(keys[0])
        expect(hashTable.size).toBe(hashTable.MAX_SIZE - 1)
        hashTable.delete('a')
        expect(hashTable.size).toBe(hashTable.MAX_SIZE - 1)
    })
})
