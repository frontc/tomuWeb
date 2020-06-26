let Fontmin = require('fontmin'); // 引入插件，当第一步中，使用全局下载的插件，这里路径要注意匹配，否则后面运行时会报找不到模块的错误，所以建议使用第二种：下载到当前项目的依赖中，本文件（fontmin.js）也建在当前项目目录下

let srcPath = './font/SentyPea.ttf'; // 字体源文件路径，需要保证该ttf文件存在
let destPath = '../assets/font';    // 字体输出路径
let text = '当前频道:收藏邀请离开已听首歌词已选歌单ToMu-让音乐连接你我新建进入号单随便听搜索伙伴加入频道您还未添加曲先添加该平台暂不支持此方式单手搜索添加查看示例链接网易云千千酷狗QQ'; //这里进行配置需要用到的字符，可以是中文或英文字母

// 初始化
let fontmin = new Fontmin()
  .src(srcPath)               // 输入配置
  .use(Fontmin.glyph({        // 字型提取插件
    text: text              // 所需文字
  }))
  .use(Fontmin.ttf2eot())     // eot 转换插件
  .use(Fontmin.ttf2woff())    // woff 转换插件
  .use(Fontmin.ttf2svg())     // svg 转换插件
  .use(Fontmin.css())         // css 生成插件
  .dest(destPath);            // 输出配置
// 执行
fontmin.run(function (err, files, stream) {
  if (err) {
    console.error(err);
  }
  console.log('done');
});
