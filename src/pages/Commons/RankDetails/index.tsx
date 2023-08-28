import { useState, useEffect } from 'react'

import { Table } from 'antd'

import Sideslip from '@components/Sideslip'
import { message } from '@components/Message'
import CommonRow from '@components/CommonRow'
import RankIcons from '@components/RankIcons'

import { timeUtils } from '@utils/time'
import { rankValueType } from './rankType'

import { getRankDetailsHttpApi } from '@api/http/url/get/account/rankDetails'

import type { RankDetails as RankDetailsType } from '@api/http/url/get/account/rankDetails/interface'
import type { RankValueTypeKey } from './rankType'

import './index.less'

/** 等级详情页面 */
const RankDetails = () => {
    // 等级详情容器
    const [acc, setAcc] = useState<RankDetailsType>({ rank: 0, totals: 0, details: [] })
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getRankDetailsHttpApi()({
            succeed: { func: (acc) => setAcc(acc) },
            failed: { func: () => message({ title: '等级详情获取失败' }) },
            finally: () => setLoading(false)
        })
    }, [])
    return (
        <Sideslip title={`账号等级${acc.rank ? `(${acc.rank})` : ''}`} isLoading={loading}>
            <CommonRow
                title="我的等级"
                list={[{ text: <RankIcons.RankIcons rank={acc.rank} /> }]}
                comment={`你共有${acc.totals}等级值，距离下一级还需${100 - (acc.totals % 100)}等级值。`}
            />
            <CommonRow title="等级图标说明：（依次为山、树、花、草）" />
            <RankIcons.RankIconsClassify />
            <CommonRow comment="单日最高可增加100等级值，每100等级值为1个等级（初始等级为1）。例如总共拥有101等级值，则等级为2级。" />
            <CommonRow title="等级值明细：" />
            <div className="im-rank-details-table">
                <Table
                    dataSource={acc.details.map((v: any, idx) => {
                        v.id = idx
                        v.type = rankValueType[v.type as RankValueTypeKey]
                        v.time = timeUtils.getDate(new Date(v.time))
                        return v
                    })}
                    pagination={{ hideOnSinglePage: true, position: ['bottomCenter'] }}
                    size="middle"
                    rowKey={(r) => r.id}
                    locale={{ emptyText: '暂无成长值明细' }}>
                    <Table.Column title="类型" dataIndex="type" />
                    <Table.Column title="等级值" dataIndex="value" />
                    <Table.Column title="时间" dataIndex="time" />
                </Table>
            </div>
        </Sideslip>
    )
}

export default RankDetails
