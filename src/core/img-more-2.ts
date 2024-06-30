/**
 * 生成 cdn 图片的 `query` 参数
 * v24.01.11
 *
 * @param size 图片大小
 * @param position 图片位置
 * @param format 图片格式
 */
export const imgMore2 = function (size: number, position = 'center', format = 'webp') {
    const thumbnail = `thumbnail/!${ size }x${ size }r`
    const output    = `crop/${ size }x${ size }`
    const gravity   = `gravity/${ position }`
    return `imageMogr2/${ thumbnail }/${ format }quality/100/${ gravity }/${ output }`
}
