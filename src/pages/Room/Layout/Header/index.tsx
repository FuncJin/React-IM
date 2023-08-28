import { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { PageHeader } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { CustomKeyByObject } from '@interface/type'
import type { HeaderType } from './interface'

/** Header栏 */
const Header: FC<HeaderType & CustomKeyByObject<'oid'>> = ({ oid, title, description }) => {
    const navigate = useNavigate()
    return (
        <PageHeader
            className="im-m-r-header"
            onBack={() => navigate(-1)}
            title={
                <>
                    <p className="im-m-r-header-title">{title}</p>
                    <p className="im-m-r-header-description">{description}</p>
                </>
            }
            extra={[
                <Link to={`/intro/${oid}`} key="0">
                    <MenuOutlined />{' '}
                </Link>
            ]}
        />
    )
}

export default memo(Header)
