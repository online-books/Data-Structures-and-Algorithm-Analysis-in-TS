export default class HashTable<T> {
    private readonly LOAD_FACTOR = 0.5;
    private readonly CAPACITY = [7, 17, 37, 97];
    private buckets: Array<{ element: T, key: string } | null>;
    private keys: Set<string> = new Set();
    private level: number = 0;
    constructor() {
        this.buckets = new Array(this.CAPACITY[this.level]).fill(null);
    }
    public get MAX_SIZE() {
        return Math.floor(this.CAPACITY[this.CAPACITY.length - 1] * this.LOAD_FACTOR)
    }
    public get size() {
        return this.keys.size;
    }
    public find(key: string): T | null {
        if (!this.hasKey(key)) {
            return null;
        }
        const { buckets } = this;
        let hashKey = this.hash(key);
        let collisionNum = 0;
        while (buckets[hashKey]!.key !== key) {
            collisionNum += 1;
            hashKey += collisionNum ** 2;
            if (hashKey >= buckets.length) {
                hashKey = hashKey % buckets.length;
            }
        }
        return buckets[hashKey]!.element;
    }
    public insert(key: string, element: T) {
        if (((this.size + 1) / this.CAPACITY[this.level]) > this.LOAD_FACTOR) {
            this.reHashing();
        }
        if (!this.hasKey(key)) {
            this.keys.add(key);
        }
        const { buckets } = this;
        let hashKey = this.hash(key);
        let collisionNum = 0;
        while (buckets[hashKey] && buckets[hashKey]!.key !== key) {
            collisionNum += 1;
            hashKey += collisionNum ** 2;
            if (hashKey >= buckets.length) {
                hashKey = hashKey % buckets.length;
            }
        }
        buckets[hashKey] = {
            key,
            element
        }
    }

    public delete(key: string) {
        if (!this.hasKey(key)) {
            return
        }
        const { buckets } = this;
        let hashKey = this.hash(key);
        let collisionNum = 0;
        while (buckets[hashKey]!.key !== key) {
            collisionNum += 1;
            hashKey += collisionNum ** 2;
            if (hashKey >= buckets.length) {
                hashKey = hashKey % buckets.length;
            }
        }
        buckets[hashKey] = null;
        this.keys.delete(key)
    }
    public getKeys() {
        return Array.from(this.keys);
    }

    private hash(key: string): number {
        let hashKey = 0;
        for (let i = 0, j = key.length; i < j; i++) {
            const code = key.codePointAt(i)!;
            hashKey += code;
        }
        return hashKey % this.buckets.length;
    }
    private hasKey(key: string) {
        return this.keys.has(key)
    }
    private reHashing() {
        if (this.level === this.CAPACITY.length - 1) {
            throw new Error('Exceed the limit ')
        }
        this.level += 1;
        const { buckets } = this;
        this.buckets = new Array(this.CAPACITY[this.level]).fill(null);
        this.keys.clear();
        buckets.forEach(item => {
            if (item) {
                this.insert(item.key, item.element);
            }
        });
    }
}
