const path = require('path')
const CracoAntDesignPlugin = require('craco-antd')

module.exports = {
    webpack: {
        alias: {
            '@/': path.join(__dirname, 'src/'),
            '@api': path.join(__dirname, 'src/api'),
            '@components': path.join(__dirname, 'src/components'),
            '@constant': path.join(__dirname, 'src/constant/index'),
            '@errors': path.join(__dirname, 'src/errors/index'),
            '@hooks': path.join(__dirname, 'src/hooks/index'),
            '@interface': path.join(__dirname, 'src/interface'),
            '@pages': path.join(__dirname, 'src/pages'),
            '@router': path.join(__dirname, 'src/router'),
            '@style': path.join(__dirname, 'src/style'),
            '@utils': path.join(__dirname, 'src/utils')
        }
    },
    plugins: [
        {
            plugin: CracoAntDesignPlugin,
            options: { customizeTheme: { '@primary-color': '#AF0069' } }
        }
    ]
}
