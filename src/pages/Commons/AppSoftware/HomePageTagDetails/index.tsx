import { Tag } from 'antd'

import Sideslip from '@components/Sideslip'
import CommonRow from '@components/CommonRow'

/** 主页标签说明 */
const HomePageTagDetails = () => (
    <Sideslip title="主页标签">
        <CommonRow
            title="标签说明"
            list={[
                {
                    text: '平台官方',
                    description: <Tag className="im-home-page-tag im-home-page-tag-ff5c66">官方</Tag>
                },
                {
                    text: '曾经或正在参与本平台开发',
                    description: <Tag className="im-home-page-tag im-home-page-tag-ff5c66">开发者</Tag>
                },
                {
                    text: '参与了平台内测计划',
                    subTitle: '账号创建时间在第一批内测计划期间',
                    description: <Tag className="im-home-page-tag im-home-page-tag-622B7D">内测成员</Tag>
                },
                {
                    text: '为平台做出过贡献',
                    description: <Tag className="im-home-page-tag im-home-page-tag-622B7D">贡献者</Tag>
                },
                {
                    text: 'GitHub',
                    subTitle: 'Star了本项目（感谢所有支持与帮助）',
                    description: <Tag className="im-home-page-tag im-home-page-tag-622B7D">满天星斗</Tag>,
                    click: () => window.open('https://github.com/FuncJin/React-IM'),
                    cursor: 'pointer',
                    more: true
                }
            ]}
        />
    </Sideslip>
)

export default HomePageTagDetails
