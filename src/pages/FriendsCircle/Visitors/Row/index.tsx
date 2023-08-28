import CommonRow from '@components/CommonRow'

import { timeUtils } from '@utils/time'

import type { FC } from 'react'

import type { VisitorsType } from './interface'

/** 来访记录详情 */
const Row: FC<VisitorsType> = ({ visitors }) =>
    visitors.length ? (
        <>
            {visitors.map(({ id, avatar, nickname, time }, i) => (
                <CommonRow
                    key={i}
                    list={[
                        {
                            icon: <img className="im-img-avatar-radius" src={avatar} />,
                            text: nickname,
                            description: timeUtils.getTime(time).all,
                            to: { pathname: `/intro/${id}` },
                            more: true
                        }
                    ]}
                />
            ))}
        </>
    ) : (
        <span style={{ color: 'var(--im-color-font-6)' }}>来访记录空空如也~</span>
    )

export default Row
