import { memo } from 'react'
import { Link } from 'react-router-dom'

import { RightOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons'

import type { FC } from 'react'

import type { CustomKeyByObject } from '@interface/type'
import type { CssStyle } from '@interface/css'
import type { CommonRowListType, CommonRowType } from './interface'

import './index.less'

type Row = {
    selected: CommonRowType['selected']
    row: CommonRowListType
    len: number
    idx: number
}

const isBorderBottom = (isBottom: boolean | undefined, len: number, idx: number) =>
    isBottom === undefined ? (len - 1 === idx ? false : true) : isBottom
const isMore = (more: boolean | undefined) => (more === undefined ? false : more)
const isColors = (colors: CommonRowListType['colors']) => {
    if (!colors) return {}
    const _style = {} as unknown as CustomKeyByObject<'backgroundColor' | 'color'>
    if (colors.bg) _style['backgroundColor'] = colors.bg
    if (colors.text) _style['color'] = colors.text
    return _style
}
const isCursor = (cursor?: CssStyle['cursor']) => (cursor ? { cursor } : {})

/** 通用行 */
const Row: FC<Row> = ({ selected, row, len, idx }) => (
    <>
        <div className="im-p-s-s-b-s-icon">{row.icon ? row.icon : null}</div>
        <div className={`im-p-s-s-b-s-content ${isBorderBottom(row.border, len, idx) ? 'im-p-s-s-b-s-border' : ''}`}>
            <div className="im-p-s-s-b-s-c-title">
                <span className={`${row.primaryColor ? 'im-p-s-s-b-s-c-primary-color' : ''}`}>
                    {row.text ? row.text : row.textNull ? row.textNull : ''}
                </span>
                {row.subTitle ? (
                    <span className="im-p-s-s-b-s-c-description im-p-s-s-b-s-c-t-sub-title">{row.subTitle}</span>
                ) : null}
            </div>
            <span className="im-p-s-s-b-s-c-description">
                {row.description ? row.description : null}&nbsp;&nbsp;
                {row.isLoading ? (
                    <LoadingOutlined />
                ) : selected !== undefined ? (
                    idx === selected ? (
                        <CheckOutlined
                            className="im-p-s-s-b-s-c-primary-color im-p-s-s-b-s-c-selected"
                            style={row.colors?.text ? { color: row.colors.text } : {}}
                        />
                    ) : null
                ) : isMore(row.more) ? (
                    <RightOutlined />
                ) : null}
            </span>
        </div>
    </>
)

/** 单个可显示的行 */
const CommonRow: FC<CommonRowType> = ({ title, comment, list, selected }) => (
    <div className="im-panel-side-section">
        {title ? <p className="im-p-s-s-assist-text">{title}</p> : null}
        <div className="im-p-s-s-body">
            {list
                ? list.map((row, idx) =>
                      row.to ? (
                          <Link
                              key={idx}
                              className="im-p-s-s-b-single"
                              style={isColors(row.colors)}
                              to={row.to.pathname}
                              state={row.to.state}
                              onClick={row.click || (() => {})}
                              title={row.hoverTip}>
                              <Row selected={selected} row={row} len={list.length} idx={idx} />
                          </Link>
                      ) : (
                          <div
                              key={idx}
                              className="im-p-s-s-b-single"
                              style={{ ...isColors(row.colors), ...isCursor(row.cursor) }}
                              onClick={row.click || (() => {})}
                              title={row.hoverTip}>
                              <Row selected={selected} row={row} len={list.length} idx={idx} />
                          </div>
                      )
                  )
                : null}
        </div>
        {comment ? <p className="im-p-s-s-assist-text">{comment}</p> : null}
    </div>
)

export default memo(CommonRow)
