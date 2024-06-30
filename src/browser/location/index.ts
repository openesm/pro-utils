/** 解析URL, search 参数转 map */
export const parseLocationSearch = () => {
    const search = window.location.search
    if ( !search ) return

    const arr = search.slice(1).split('&')

    const map: Record<string, string> = {}
    for (let i = 0; i < arr.length; i++) {
        const [key = '', val = ''] = arr[i]!.split('=')
        map[key] = val
    }

    return map
}

/** 获取 websocket 域名 */
export function getWsHost() {
    const { protocol, hostname } = window.location
    const wsProtocol = (protocol === 'https:' && 'wss://') || 'ws://'
    return `${ wsProtocol }${ hostname }`
}

/** 获取域名 */
export const getHost = () => {
    const { protocol, hostname } = window.location
    return `${ protocol }//${ hostname }`
}
