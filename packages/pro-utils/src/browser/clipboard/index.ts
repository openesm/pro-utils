// 拷贝文本至剪切板
export function copyText(input: string, { target = document.body }: any = {}) {
    const element = document.createElement('textarea')
    const previouslyFocusedElement = document.activeElement

    element.value = input

    element.setAttribute('readonly', '');

    (element.style as any).contain = 'strict'
    element.style.position = 'absolute'
    element.style.left = '-9999px'
    element.style.fontSize = '12pt'

    const selection = document.getSelection()
    let originalRange
    if (selection && selection.rangeCount > 0) {
        originalRange = selection.getRangeAt(0)
    }

    target.append(element)
    element.select()

    element.selectionStart = 0
    element.selectionEnd = input.length

    let isSuccess = false
    try {
        isSuccess = document.execCommand('copy')
    } catch (e: any) {
        throw new Error(e)
    }

    element.remove()

    if (originalRange && selection) {
        selection.removeAllRanges()
        selection.addRange(originalRange)
    }

    if (previouslyFocusedElement) {
        (previouslyFocusedElement as HTMLElement).focus()
    }

    return isSuccess
}
