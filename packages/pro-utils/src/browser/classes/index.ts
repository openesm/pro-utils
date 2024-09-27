import { upperFirst } from 'lodash-es'

function trim(string: string) {
    // eslint-disable-next-line regexp/no-dupe-characters-character-class
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

/* 检查类名是否存在 */
export function hasClass(el: Element, cls: string) {
    if (!el || !cls) return false
    if (cls.includes(' ')) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    }
    else {
        return (` ${  el.className  } `).includes(` ${  cls  } `)
    }
}

/* 添加类名 */
export function addClass(el: Element, cls: string) {
    if (!el) return
    let curClass = el.className
    const classes = (cls || '').split(' ')

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.add(clsName)
        }
        else if (!hasClass(el, clsName)) {
            curClass += ` ${  clsName }`
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}

/* 删除类名 */
export function removeClass(el: Element, cls: string) {
    if (!el || !cls) return
    const classes = cls.split(' ')
    let curClass = ` ${  el.className  } `

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.remove(clsName)
        }
        else if (hasClass(el, clsName)) {
            curClass = curClass.replace(` ${  clsName  } `, ' ')
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}

/** 兼容样式 */
export function hackCss(attr: string, value: string) {
    const prefix: string[] = ['webkit', 'Moz', 'ms', 'OT']

    const styleObj: any = {}
    prefix.forEach((item) => {
        styleObj[`${ item }${ upperFirst(attr) }`] = value
    })
    return {
        ...styleObj,
        [attr]: value,
    }
}
