export type EmptyType = {
    /** 为空时的提示文字 */
    feedback: string
    /** 为空时所展示的图片类型 */
    type?: 'message' | 'friendsCircle' | 'stranger' | 'friendsCircleInform'
}
