import { useState } from 'react'

import type { FC, MouseEvent } from 'react'

import type { DrawerButtonClick, DrawerType } from '@components/Drawer/interface'
import type { GlobalCreateElementComponent } from '@utils/dom/createElement/interface'

import './index.less'

/** 抽屉组件 */
const DrawerComponent: FC<GlobalCreateElementComponent<DrawerType>> = ({ title, list, backTitle, isBg, close }) => {
    // 抽屉的开关状态
    const [state, setState] = useState(true)
    const cancelDrawer = (func?: DrawerButtonClick) => {
        return (ev: MouseEvent<HTMLParagraphElement>) => {
            setState(false)
            setTimeout(() => {
                func && func(ev)
                close()
            }, 300)
        }
    }
    return (
        <div
            className={`im-dialog-drawer ${isBg ? 'im-dialog-drawer-bg' : ''} ${
                state ? '' : 'im-dialog-drawer-bounce-h'
            }`}>
            <div className={`im-d-d-options ${state ? '' : 'im-dialog-drawer-body-bounce-h'}`}>
                <div className="im-d-d-o-list">
                    {title ? <p className="im-d-d-o-list-title">{title}</p> : null}
                    {list.map((option, key) => (
                        <p
                            className={`im-d-d-o-text ${option.color ? `im-d-d-o-list-text-${option.color}` : ''}`}
                            key={key}
                            onClick={cancelDrawer(option.click)}>
                            {option.text}
                        </p>
                    ))}
                </div>
                <p className="im-d-d-o-back im-d-d-o-text" onClick={cancelDrawer(backTitle?.back)}>
                    {backTitle ? backTitle.title : '取消'}
                </p>
            </div>
        </div>
    )
}

export default DrawerComponent
