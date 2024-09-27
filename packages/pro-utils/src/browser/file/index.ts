/**
 * DataURL 基本原理
 * https://www.cnblogs.com/tianma3798/p/13582175.html
 *
 * Blob 你知道多少 （Blob 类型的对象表示不可变的类似文件对象的原始数据）
 * https://zhuanlan.zhihu.com/p/500199997
 *
 * atob: 解码 base64 字符串
 * btoa: 编码 base64
 * https://www.runoob.com/jsref/met-win-atob.html
 *
 * Uint8Array:  数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
 */

/**
 * base64 图片转换成 Blob
 *
 * eg:
 * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0e....
 */
export function dataURLToBlob(base64Buffer: string): Blob {
    const [detail = '', content = '']  = base64Buffer.split(',')
    const mime = detail.match(/:(.*?);/)![1] // 文件类型

    const buffer_content = window.atob(content) // 编码 base64
    let   buffer_len     = buffer_content.length
    const u8_arr         = new window.Uint8Array(buffer_len)

    while (buffer_len--) {
        u8_arr[buffer_len] = buffer_content.charCodeAt(buffer_len) // 返回指定位置的字符的 Unicode 编码
    }

    return new Blob([u8_arr], { type: mime })
}

/** 图片路径转换成 Base64 */
export async function urlToBase64(url: string, mime?: string): Promise<string> {
    const img = await loadImage(url)
    if ( !img ) return ''

    let canvas = document.createElement('canvas') as HTMLCanvasElement | null
    const ctx  = canvas!.getContext('2d')
    if ( !ctx ) return ''

    canvas!.width  = img.width
    canvas!.height = img.height

    ctx.drawImage(img, 0, 0)

    const dataURL = canvas!.toDataURL(mime || 'image/png')
    canvas = null
    return dataURL
}

/** 加载远程图片 */
export function loadImage(url: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
        // 创建图片对象，加载远程图片
        const img = new Image()
        img.crossOrigin = ''

        img.onload = function () {
            resolve(img)
        }

        img.onerror = function () {
            resolve(null)
        }

        img.src = url
    })
}

/** 根据文件流下载 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
    const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
    const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })

    const blobURL = window.URL.createObjectURL(blob)
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', filename)
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    window.URL.revokeObjectURL(blobURL)
}

/** 基于 base64 下载图片 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
    const base64Buf = dataURLToBlob(buf)
    downloadByData(base64Buf, filename, mime, bom)
}

/** 基于在线 URL 下载图片 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
    urlToBase64(url).then((base64) => {
        downloadByBase64(base64, filename, mime, bom)
    })
}

/** 根据文件地址打开新窗口下载 */
export function downloadByUrl({
    url,
    target = '_blank',
    fileName,
}: {
    url      : string
    target?  : '_self' | '_blank'
    fileName?: string
}): boolean {
    const isChrome = window.navigator.userAgent.toLowerCase().includes('chrome')
    const isSafari = window.navigator.userAgent.toLowerCase().includes('safari')

    // eslint-disable-next-line regexp/no-unused-capturing-group
    if (/(iP)/g.test(window.navigator.userAgent)) {
        console.error('你的浏览器不支持下载功能!')
        return false
    }
    if (isChrome || isSafari) {
        const link = document.createElement('a')
        link.href = url
        link.target = target

        if (link.download !== undefined) {
            link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
        }

        if (document.createEvent) {
            const e = document.createEvent('MouseEvents')
            e.initEvent('click', true, true)
            link.dispatchEvent(e)
            return true
        }
    }
    if (!url.includes('?')) {
        url += '?download'
    }

    openWindow(url, { target })
    return true
}

/**
 * 打开新窗口
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
 */
export function openWindow(
    url: string,
    opt?: { target?: '_self' | '_blank' | string; noopener?: boolean; noreferrer?: boolean },
) {
    const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
    const feature: string[] = []

    noopener && feature.push('noopener=yes')
    noreferrer && feature.push('noreferrer=yes')

    window.open(url, target, feature.join(','))
}
