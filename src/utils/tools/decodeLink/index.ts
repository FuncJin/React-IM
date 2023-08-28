const reg =
    /(https?:\/\/)?(([0-9a-z.]+\.[a-z]+)|(([0-9]{1,3}\.){3}[0-9]{1,3}))(:[0-9]+)?(\/[0-9a-z%/.\-_]*)?(\?[0-9a-z=&%_\-]*)?(\#[0-9a-z=&%_\-]*)?/g

/**
 * 在一段文字中解析url链接
 * - 如果存在url链接，则将文字中的链接替换为相应的a标签
 * - 如果不存在url链接，则返回原文字
 */
export const decodeLink = (text: string) =>
    reg.test(text)
        ? text.replace(
              reg,
              (a) => `<a id="im-decode-link-a" href="https://imlink.funcjin.cn?target=${a}" target="_blank">${a}</a>`
          )
        : text
