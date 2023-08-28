import { useState, useEffect, memo } from 'react'

import type { FC } from 'react'

import type { RankIconsType } from './interface'

import grass from './imgs/grass.png'
import flower from './imgs/flower.png'
import tree from './imgs/tree.png'
import mountain from './imgs/mountain.png'

import './index.less'

// 依次表示山、树、花、草
const imgs = [mountain, tree, flower, grass]
/** 默认的等级分类 */
const defaultRank = [100, 50, 5, 1]

/**
 * 账号等级所对应的图标
 * - 1山 = 100级
 * - 1树 = 50级
 * - 1花 = 5级
 * - 1草 = 1级
 */
const RankIcons: FC<RankIconsType> = ({ rank }) => {
    const [icons, setIcons] = useState([0, 0, 0, 0])
    useEffect(() => {
        const iconsLimit: number[] = []
        let _rank = rank
        for (let i = 0; i < 4; i++) {
            _rank = _rank / defaultRank[i]
            // 小于1的情况
            if (_rank < 1) {
                iconsLimit.push(0)
                _rank = _rank * defaultRank[i]
                continue
            }
            // 大于等于1的情况
            // 是否是整数
            if (_rank === Math.round(_rank)) {
                iconsLimit.push(_rank)
                break
            }
            // 如果不是整数，且result大于1的情况
            iconsLimit.push(Math.floor(_rank))
            _rank = rank % defaultRank[i]
        }
        setIcons(iconsLimit)
    }, [rank])
    return (
        <span className="im-acc-rank-icons">
            {icons.map((r, order) =>
                icons[order]
                    ? (Array.from({ length: r }) as number[]).map((_, key) => <img key={key} src={imgs[order]} />)
                    : null
            )}
        </span>
    )
}

/** 展示每个等级图标所对应的等级 */
const RankIconsClassify = () => (
    <div className="im-acc-rank-icons im-acc-rank-icons-classify">
        <p>
            <img src={mountain} />
            =100级；
            <img src={tree} />
            =50级；
            <img src={flower} />
            =5级；
            <img src={grass} />
            =1级
        </p>
    </div>
)

const data = {
    RankIcons: memo(RankIcons),
    RankIconsClassify: memo(RankIconsClassify)
}

export default data
