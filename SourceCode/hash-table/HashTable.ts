/** @format */

export default class HashTable<T> {
    public size = 0
    private readonly LOAD_FACTOR = 0.5
    private readonly CAPACITY = [7, 17, 37, 97, 197, 397]
    private buckets: Array<{element: T; key: string} | null>
    private level = 0
    constructor() {
        this.buckets = new Array(this.CAPACITY[this.level]).fill(null)
    }
    public get MAX_SIZE(): number {
        return Math.floor(this.CAPACITY[this.CAPACITY.length - 1] * this.LOAD_FACTOR)
    }
    public find(key: string): T | null {
        const hashKey = this.getHashKey(key)
        const value = this.buckets[hashKey]
        if (value) {
            return value.element
        }
        return null
    }
    public insert(key: string, element: T): number {
        if ((this.size + 1) / this.CAPACITY[this.level] > this.LOAD_FACTOR) {
            this.reHashing()
        }
        const hashKey = this.getHashKey(key)
        if (!this.buckets[hashKey]) {
            this.size += 1
        }
        this.buckets[hashKey] = {
            key,
            element,
        }
        return hashKey
    }

    public delete(key: string): void {
        const hashKey = this.getHashKey(key)
        if (this.buckets[hashKey]) {
            this.size -= 1
        }
        this.buckets[hashKey] = null
    }

    private hash(key: string): number {
        let hashKey = 0
        for (let i = 0, j = key.length; i < j; i++) {
            const code = key.codePointAt(i)!
            hashKey += code
        }
        return hashKey % this.buckets.length
    }
    private getHashKey(key: string): number {
        const {buckets} = this
        let hashKey = this.hash(key)
        let collisionNum = 0
        while (buckets[hashKey] && buckets[hashKey]!.key !== key) {
            collisionNum += 1
            hashKey += collisionNum ** 2
            if (hashKey >= buckets.length) {
                hashKey = hashKey % buckets.length
            }
        }
        return hashKey
    }
    private reHashing() {
        if (this.level === this.CAPACITY.length - 1) {
            throw new Error('Exceed the limit ')
        }
        this.level += 1
        const {buckets} = this
        this.buckets = new Array(this.CAPACITY[this.level]).fill(null)
        this.size = 0
        buckets.forEach(item => {
            if (item) {
                this.insert(item.key, item.element)
            }
        })
    }
}
