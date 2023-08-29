import CommonRow from '@components/CommonRow'
import Sideslip from '@components/Sideslip'

/** 新手引导 */
const NoviceGuide = () => (
    <Sideslip title="新手引导">
        <CommonRow
            title="来日方长，我们终于遇见了。非常欢迎你能够来到此平台，我在下面列出了你可能感兴趣的引导项"
            list={[
                { text: '添加官方开发者账号', to: { pathname: '/intro/1000' }, more: true },
                { text: '添加官方交流群账号', to: { pathname: '/intro/100000' }, more: true },
                {
                    text: '查看与我有关的设置',
                    subTitle: '或者你也可以在首页通过单击左上角头像来进入',
                    to: { pathname: '/settings' },
                    more: true
                }
            ]}
        />
        <CommonRow
            title="下面是与本项目相关的一些开源链接"
            list={[
                {
                    text: '开源指南',
                    click: () => window.open('https://juejin.cn/post/7272300319995527208'),
                    more: true
                },
                {
                    text: '项目GitHub托管地址',
                    click: () => window.open('https://github.com/FuncJin/React-IM'),
                    more: true
                }
            ]}
        />
        <CommonRow comment="最后，如果你对本项目仍存有疑问，请联系开发者邮箱" list={[{ text: '1767439745@qq.com' }]} />
    </Sideslip>
)

export default NoviceGuide
