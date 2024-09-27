/**
 * 数组工具函数
 * v24.01.11
 */
import { isFunction } from './is'

/** 替换数组项 */
export function set<T>(list: T[], data: T, key: keyof T) {
    const idx = list.findIndex(item => item[key] === data[key])

    const is_has = idx !== -1
    is_has && list.splice(idx, 1, data)

    return is_has
}

/** 删除数组项 */
export function del<T>(list: T[], data: T, ...keys: (keyof T)[]) {
    const idx = list.findIndex(item => keys.every(key => item[key] === data[key]))

    const is_has = idx !== -1
    is_has && list.splice(idx, 1)

    return is_has
}

/** 通过函数返回值删除列表项 */
export function delBy<T>(list: T[], fn: ((item: T) => boolean)) {
    for (let i = list.length - 1; i >= 0; i--) {
        const is_del = fn(list[i]!)
        if ( is_del ) list.splice(i, 1)
    }
}

/** 替换数组项 */
export function replace<T>(list: T[], data: T, ...keys: (keyof T)[]) {
    const idx = list.findIndex(item => keys.every(key => item[key] === data[key]))
    idx !== -1 ? list.splice(idx, 1, data) : list.push(data)
}

/** 替换数组项 */
export function replacex<T>(list: T[], data: T, ...keys: (keyof T)[]) {
    const idx = list.findIndex(item => keys.every(key => item[key] === data[key]))
    idx !== -1 ? list.splice(idx, 1, data) : list.unshift(data)
}

/** 获取指定 key 项下标 */
export function getIndexByKey<T>(list: T[], data: T, ...keys: (keyof T)[]) {
    return list.findIndex(item => keys.every(key => item[key] === data[key]))
}

/** 通过下标取得数组，允许负数 */
export function at<T>(list: T[], index: number): T | undefined {
    return index < 0 ? list[list.length + index] : list[index] // 运行负数取得尾部项（新版 Array.at 语法兼容性问题）
}

/** 数组指定 key 排序 */
export function sortBy<T>(list: T[], ...keys: (keyof T)[]) {
    list.sort((obj1, obj2) => {
        for (const k of keys) {
            const val1 = obj1[k]
            const val2 = obj2[k]
            if (val1 === val2) continue
            return val1 > val2 ? 1 : -1
        }
        return 0
    })
}

/** 中文字符串排序数组 */
export function compareBy<T>(list: T[], ...keys: (keyof T)[]) {
    list.sort((obj1, obj2) => {
        for (const k of keys) {
            const val1 = obj1[k]
            const val2 = obj2[k]
            if (val1 === val2) continue
            return String(val1).localeCompare(String(val2))
        }
        return 0
    })
}

/**
 * v24.03.08
 * 统计数字列表
 */
export function count(list: number[]) {
    let count = 0
    list.forEach((num) => {
        count += num
    })
    return count
}

/**
 * v24.03.08
 * 指定key，统计数量
 */
export function countBy<T extends Record<string, any>>(list: T[], getKey: keyof T | ((item: T) => number)) {
    let count = 0
    list.forEach((item) => {
        if (isFunction(getKey)) {
            const val = getKey(item) || 0
            count += val
        } else {
            const val = item[getKey] || 0
            count += val
        }
    })
    return count
}

