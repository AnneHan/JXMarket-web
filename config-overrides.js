const path = require('path')
// node_modules/react-scripts/config/webpack.config.js
const {
  override,
  addDecoratorsLegacy,
  addWebpackAlias,
  addPostcssPlugins,
  addWebpackPlugin,
  addWebpackModuleRule,
  adjustStyleLoaders,
  setWebpackStats,
  babelExclude,
  setWebpackOptimizationSplitChunks
} = require('customize-cra')

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin') // 显示打包速度

console.log('ENV', process.env.NODE_ENV)

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = override(
  // 装饰器
  addDecoratorsLegacy(),
  // Alias
  addWebpackAlias({
    '@': resolve('src'),
    '@comps': resolve('src/pages/components'),
    '@style': resolve('src/assets/style'),
    '@images': resolve('src/assets/images'),
    '@pages': resolve('src/pages'),
    '@type': resolve('src/@types'),
    '@api': resolve('src/utils/http'),
  }),
  // 控制台只输出报错  https://www.shouce.ren/api/view/a/13366
  setWebpackStats('errors-only'),
  // postcss
  addPostcssPlugins([
    require('postcss-autoreset')({
      // 重置浏览器默认样式
      reset: {
        margin: 0,
        padding: 0,
      },
    }),
  ]),
  // 排除
  babelExclude('/node_modules/'),
  // analyzer
  process.env.REACT_APP_REPORT == 'true' ? addWebpackPlugin(new BundleAnalyzerPlugin()) : '',
  // 给打包加 进度条  webpackbar & progress-bar-webpack-plugin
  addWebpackPlugin(new ProgressBarWebpackPlugin()),
  setWebpackOptimizationSplitChunks({
    maxInitialRequests: 20,// 最大初始请求数量
    minSize: 50 * 1024, // 抽离体积大于50kb的chunk
    minChunks: 2,  // 抽离被多个入口引用次数大于等于2的chunk
    // 缓存组
    cacheGroups: {
      antDesign: {
        name: 'chunk-antDesign',
        test: /[\/]node_modules[\/]_?@ant-design(.*)/,
        priority: 10, // 缓存组打包的先后优先级，数值大的优先
        enforce: true, //告诉 webpack 忽略 splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests，始终为此缓存组创建 chunk。
        reuseExistingChunk: true, // 如果当前的 chunk 已被从 split 出来，那么将会直接复用这个 chunk 而不是重新创建一个
      },
      wangEditor: {
        name: 'chunk-wangEditor',
        test: /[\/]node_modules[\/]_?@wangeditor(.*)/,
        priority: 8,
        enforce: true, // 始终为此缓存组创建 chunk。
        reuseExistingChunk: true, // 重复使用已经存在的块
      },
      antv: {
        name: 'chunk-antv',
        test: /[\/]node_modules[\/]_?@antv(.*)/,
        priority: 7,
        minSize: 0,
        enforce: true, // 始终为此缓存组创建 chunk。
        reuseExistingChunk: true, // 重复使用已经存在的块
      },
      nodesAsync: {
        name: 'chunk-nodesAsync',
        test: /[\/]node_modules[\/]/,
        // 一个模块可以属于多个缓存组。优化将优先考虑具有更高 priority（优先级）的缓存组。
        // 默认组的优先级为负，以允许自定义组获得更高的优先级（自定义组的默认值为 0）。
        priority: 2,
        minChunks: 2,
        // chunks 代码块类型 必须三选一： “initial”（初始化） | “all”(默认就是 all) | “async”（动态加载）默认
        chunks: 'async', // 仅打包异步引用的依赖
        reuseExistingChunk: true, // 重复使用已经存在的块
      },
      nodesInitial: {
        name: 'chunk-nodesInitial',
        filename: 'static/js/[name].[contenthash:8].chunk.js', // sy chunks 为 initial时，需要设置filename，否则无法启动
        test: /[\/]node_modules[\/]/,
        priority: 1, // 优先级
        minChunks: 1,
        chunks: 'initial',
        reuseExistingChunk: true, // 重复使用已经存在的块
      },
    },
  }),
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [resolve('./src/assets/styles/theme/_theme.scss')],
        },
      })
    }
  }),
  addWebpackModuleRule({
    test: /\.svg$/,
    exclude: [/node_modules/],
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {},
      },
      {
        loader: 'svgo-loader',
        options: {},
      },
    ],
  })
)
