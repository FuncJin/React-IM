import { Outlet, Link } from 'react-router-dom'

import { SearchOutlined, MailOutlined, SettingOutlined, PlusSquareOutlined } from '@ant-design/icons'

import './index.less'

type LisTypes = keyof typeof lisIcon

const lisIcon = {
    创建群聊: {
        pathname: '/groupchat/create',
        icon: <PlusSquareOutlined />
    },
    管理分组: {
        pathname: '/friends/managementGroups',
        icon: <SettingOutlined />
    },
    查找好友或群聊: {
        pathname: '/search',
        icon: <SearchOutlined />
    },
    与我有关的通知: {
        pathname: '/inform',
        icon: <MailOutlined />
    }
}

const lisTitle = Object.keys(lisIcon) as LisTypes[]

/** 更多(创建群聊、管理分组、查找好友或群聊、与我有关的通知) */
const More = () => (
    <>
        <ul className="im-p-c-classify-section im-p-c-c-s-extends">
            {lisTitle.map((title, idx) => (
                <li key={idx}>
                    <Link to={lisIcon[title].pathname}>
                        {title}
                        {lisIcon[title].icon}
                    </Link>
                </li>
            ))}
        </ul>
        <Outlet />
    </>
)
export default More
