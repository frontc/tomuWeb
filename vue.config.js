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
  return `${name}(${versionTag})`;
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
            },
            warnings: false,
          },
          sourceMap: false,
          parallel: true,
        }),
      );
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
