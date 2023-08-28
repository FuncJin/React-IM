import { message } from '@components/Message'

/** 复制内容(往用户剪切板中写入内容) */
export const copyContent = (content: string, tip?: string) => {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('id', 'im-shallow-hidden')
    document.querySelector('#root')!.appendChild(textarea)
    textarea.innerText = content
    textarea.select()
    // 执行复制命令
    const copyState = document.execCommand('copy')
    // 避免移动端下弹出输入框
    // 失焦
    textarea.blur()
    document.activeElement && (document.activeElement as HTMLTextAreaElement).blur()
    copyState ? message({ title: tip ? tip : '已复制' }) : message({ title: '复制失败' })
}
