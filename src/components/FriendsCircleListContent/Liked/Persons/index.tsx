import { Link } from 'react-router-dom'

import type { FC } from 'react'

import type { PersonsType } from './interface'

/** 渲染点赞者 */
const Persons: FC<PersonsType> = ({ like: { counts, persons } }) => (
    <>
        {persons.map((p, key) => (
            <span key={key}>
                <Link to={`/intro/${p.id}`}>{p.nickname}</Link>
                {key === counts - 1 ? '' : '、'}
            </span>
        ))}
        {counts ? (counts < 6 ? '觉得很赞' : `等${counts}人觉得很赞`) : null}
    </>
)

export default Persons
