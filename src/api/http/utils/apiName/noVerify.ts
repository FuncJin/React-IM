export const noVerify = [
    // 登录
    '/login',
    // 注册
    '/register',
    // 注册账号时所发送的邮箱验证码
    '/send/mail/code/register',
    // 重置(忘记)密码时所发送的邮箱验证码
    '/set/account/resetPwd',
    // 获取系统api接口状态
    '/get/system/api/state'
] as const
