const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    // 实现按需打包，根据import打包。
    // 使用工具bebel-plugin-import来根据import打包。
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // style: 'css', // 自动打包相关的样式，没有引入addLessLoader这个方法之前这里的value是css
        style: true
    }),
    // 这个是自定义主题
    // 使用 less-loader覆盖源码的less
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    })
);