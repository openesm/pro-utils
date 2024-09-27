import { isFunction, isObject, isNumber } from 'lodash-es'

export interface StorageCacheConstructorOptions {
    storage  : Storage
    prefixKey: string | (() => string)
    timeout  : number
}

/** 缓存类 */
class StorageCache {
    private storage  : Storage
    private prefixKey: string | (() => string)
    private timeout  : number

    constructor(opt: Partial<StorageCacheConstructorOptions>) {
        this.storage   = opt.storage   || sessionStorage
        this.prefixKey = opt.prefixKey || ''
        this.timeout   = opt.timeout   || 0

        this.cleanUp()
    }

    /** 转换为大写字母 KEY */
    private getKey(key: string) {
        const prefixKey = isFunction(this.prefixKey) ? this.prefixKey() : this.prefixKey
        return `${ prefixKey }:${ key }`
    }

    set(key: string, value: any, expire: number = this.timeout): boolean {
        try {
            const stringData = JSON.stringify({
                value,
                time: Date.now(),
                expire,
            })

            this.storage.setItem(this.getKey(key), stringData)
            return true
        } catch {
            return false
        }
    }

    get<T>(key: string): T | null {
        try {
            const val = this.storage.getItem(this.getKey(key))
            if (!val) return null

            // 不符合格式，清除缓存
            const obj = JSON.parse(val)
            if (!isObject(obj)) {
                this.remove(key)
                return null
            }
            const { value, time, expire } = obj as Record<string, any>
            if (value === undefined || !isNumber(time) || !isNumber(expire)) {
                this.remove(key)
                return null
            }

            // 缓存过期，清除缓存。
            if (expire && Date.now() > (expire * 1000) + time) {
                this.remove(key)
                return null
            }

            return value
        } catch {
            this.remove(key)
            return null
        }
    }

    remove(key: string) {
        this.storage.removeItem(this.getKey(key))
    }

    /** 获取指定前缀的 keys */
    getKeys() {
        const pKey = this.getKey('')

        const keys: string[] = []
        for (let i = 0; i < this.storage.length; i++ ) {
            const key = this.storage.key(i)
            if (key && key.startsWith(pKey)) {
                keys.push(key.slice(pKey.length))
            }
        }

        return keys
    }

    /** 清空缓存 */
    clear(): void {
        this.getKeys().forEach((key) => {
            this.remove(key)
        })
    }

    /** 清除过期缓存 */
    cleanUp(): void {
        this.getKeys().forEach((key) => {
            this.get(key)
        })
    }
}

/** 创建缓存 */
export function CreateStorage(opt: Partial<StorageCacheConstructorOptions>) {
    return new StorageCache(opt)
}
