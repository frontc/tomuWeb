const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const buildOutputDir = (name = 'dist') => {
  const today = new Date();
  const reg = /(\s)|(-)|(\/)|(:)|([\u4e00-\u9fa5]{2})/g;
  const localStr = today
    .toLocaleString()
    .replace(reg, '');

  const envTag = {
    development: 'T', // 开发|测试服
    production: 'P', // 正式服
  };
  const versionTag = `${envTag[process.env.ENV]}_${localStr}`;
  return process.env.ENV === 'development' ?  `${name}(${versionTag})` : 'build';
};
module.exports = {
  publicPath: './',
  outputDir: buildOutputDir('tomuWeb'),
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_debugger: true,
              drop_console: true,
            }
          },
          sourceMap: false,
          parallel: true,
        }),
      );
    }
  },
  devServer: {
    proxy: { // 配置跨域
      '/api': {
        //要访问的跨域的api的域名
        target: 'http://localhost:8888',
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/style/variables.less')
      ]
    }
  }
};
