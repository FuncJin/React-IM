/** 能够提交的反馈类型 */
type FeedbackType = 'bug' | 'suggest' | 'complaint'

export type FeedbackContentApiRequestData = {
    type: FeedbackType
    content: string
    other: string
}
