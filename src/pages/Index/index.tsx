import { Link } from 'react-router-dom'

import { Button } from 'antd'

import HtmlComment from '@components/HtmlComment'

import { getCurDeviceType } from '@utils/device/curDeviceType'

import './index.less'

/** pc或移动端下加载不同尺寸的图片 */
const bgImg = () => `url('./images/index_bg_${getCurDeviceType() === 'pc' ? 'large' : 'small'}.jpg')`

/** 网站首页(/index 或 /) */
const Index = () => (
    <article className="im-index">
        <HtmlComment>hearder</HtmlComment>
        <section className="im-index-header">
            <ul className="im-i-h-nav">
                <li>
                    <a href="https://im.funcjin.cn" target="_blank">
                        <h1>即时通讯</h1>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/FuncJin/React-IM" target="_blank">
                        GitHub
                    </a>
                </li>
            </ul>
        </section>
        <HtmlComment>main</HtmlComment>
        <section className="im-index-body" style={{ backgroundImage: bgImg() }}>
            <div className="im-i-b-text">
                <p className="im-i-b-t-title">高山流水遇知音，彩云追月得知己</p>
                <p className="im-i-b-t-intro">
                    「社交」是每个人都无法回避的话题，尤其是进入移动互联网时代，科技的快速发展放大了人们对于移动社交需求的渴望。本项目以此为背景，使用React、Express、Socket.io进行开发，目前支持私聊、群聊、朋友圈等众多功能
                </p>
            </div>
            <Button className="im-i-b-start" type="primary">
                <Link to="/login">现在开始</Link>
            </Button>
        </section>
        <HtmlComment>footer</HtmlComment>
        <section className="im-index-footer">
            <a href="https://beian.miit.gov.cn/">鲁ICP备2021007041号-2</a>
        </section>
    </article>
)

export default Index
