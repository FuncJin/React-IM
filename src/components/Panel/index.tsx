import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './Header'
import Tab from './Tab'
import DropDownRefreshBody from './DropDownRefreshBody'

import type { FC } from 'react'

import type { PanelType } from './interface'

/** 不展示内容(具体表现为：render返回为null) */
const nullArrs = ['/', '/index', '/login', '/register', '/retrievePwd']
/** 展示内容(具体表现为：通过css动画进行展示) */
const showContentArrs = ['/message', '/contacts', '/friendsCircle']
/** 不展示内容，但保留结构(具体表现为：通过css动画进行隐藏) */

/** 主面板 */
const Panel: FC<PanelType> = (props) => {
    // 当前路径
    const { pathname } = useLocation()
    // 是否不属于主内容区域的页面
    const isNull = nullArrs.find((path) => path === pathname)
    // 是否展示Header与Tab
    const isContentShow = !!showContentArrs.find((path) => path === pathname)
    return isNull ? (
        <Fragment key="0">{props.children}</Fragment>
    ) : (
        <>
            <Header isContentShow={isContentShow} />
            {props.children}
            <DropDownRefreshBody />
            <Tab isContentShow={isContentShow} />
        </>
    )
}

export default Panel
