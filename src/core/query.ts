/** 给定对象转 query 字符串 */
export function objToQuery(
    obj    : Record<string, string | number>,
    option?: { encodeKey?: boolean; encodeValue?: boolean; prefix?: boolean },
) {
    if (!obj) return ''

    const opt = { encodeKey: true, encodeValue: true, prefix: '', ...option }
    const args: string[] = []
    Object.keys(obj).forEach((key) => {
        const val = obj[key]
        if (typeof val === 'string' || typeof val === 'number') {
            const _key = opt.encodeKey   ? encodeURIComponent(key) : key
            const _val = opt.encodeValue ? encodeURIComponent(val) : val
            args.push(`${ _key }=${ _val }`)
        }
    })

    return args.length ? `?${ args.join('&') }` : ''
}

/** 给定 query 字符串转对象  */
export function queryToObj(
    query_string: string,
    option     ?: { decodeKey?: boolean; decodeValue?: boolean },
) {
    if (!query_string) return {}

    const opt = { decodeKey: true, decodeValue: true, ...option }
    const obj: Record<string, string> = {}
    query_string = query_string.trim().replace(/^\?+/, '')
    query_string.split('&').forEach((q) => {
        if (!q) return
        const [key, val] = q.split('=')
        if (key && val !== undefined) {
            const _key = opt.decodeKey   ? decodeURIComponent(key) : key
            const _val = opt.decodeValue ? decodeURIComponent(val) : val
            obj[_key] = _val
        }
    })

    return obj
}

// /** 对象转 query */
// export const objToQuery = function (obj:  Record<string, string | number>) {
//     let query = ''
//     if (!obj || !Object.keys(obj).length) return query

//     Object.keys(obj).forEach((k) => {
//         if (typeof obj[k] !== undefined) {
//             const v = encodeURIComponent(obj[k])
//             query += query ? `&${ k }=${ v }` : `${ k }=${ v }`
//         }
//     })

//     return query ? `?${ query }` : query
// }

// /** query 转对象 */
// export const queryToObj = function (query: string) {
//     const obj: Record<string, string> = {}
//     if (!query) return obj

//     query.split('&').forEach((q) => {
//         if (!q) return

//         const [key, val] = q.split('=')
//         if (key && val !== undefined) {
//             obj[encodeURIComponent(key)] = encodeURIComponent(val)
//         }
//     })

//     return obj
// }

