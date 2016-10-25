var path = require('path');
var fs = require('fs');
var merge = require('webpack-merge');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');

//取出页面文件映射
function getHtmlPluginArr() {
  var data = JSON.parse(fs.readFileSync('app/entries.json', 'utf-8'));
  var pageList = data.pageList;
  var resultObj = {
    "pluginArr": [],
    "entryObj": {}
  };
  for (var index = 0; index < pageList.length; index++) {
    var element = pageList[index];
    var src = element.entry;
    //通过对app.json中src的路径截取获得分发路径
    var dist = (function() {
      var s1 = src.split("./app/entries/")[1];
      var s2 = s1.substr(0, s1.lastIndexOf("/"));
      return s2;
    })();
    var title = element.title;
    var extra = element.extra;
    resultObj.entryObj[dist] = src;

    //利用路径一部分来进行HtmlwebpackPlugin的chunks
    resultObj.pluginArr.push(
      new HtmlwebpackPlugin({
        chunks: [dist], //当前页面js
        title: title,
        extra: extra,//包含页面额外的配置信息
        template: "app/" + "template.ejs",
        filename: dist + '.html',
        chunksSortMode: "dependency" //按chunks的顺序对js进行引入
      })
    );
  }
  return resultObj;
}

var appJsonObj = getHtmlPluginArr();
/**通用配置 */
var commonConfig = {
  entry: appJsonObj.entryObj,
  module: {
    loaders: [
      { test: /\.html$/, loader: "html?minimize=false" },
      { test: /\.json$/, loader: "json" },
      { test: /\.scss|\.css$/, loaders: ["style", "css", "sass"] },
      { test: /\.(?:jpg|gif|png)$/, loader: 'url?limit=10240&name=../images/[name]-[hash:10].[ext]' },
      { test: /\.handlebars/, loader: "handlebars" },
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel', query: { presets: ['es2015','stage-3','react'] } },
      { test: /\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'babel',  query: { presets: ['react','stage-3','es2015']} }
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: "js/[name].js"
  },
  externals: {
    "jquery": "jQuery"
  },
  //配置短路径引用
  resolve: {
    alias: {
      module: path.resolve(APP_PATH, 'module'),
      service: path.resolve(APP_PATH, "services"),
      component: path.resolve(APP_PATH, "components"),
      entries: path.resolve(APP_PATH, "entries"),
      routes: path.resolve(APP_PATH, "routes"),
      node_modules: path.resolve(ROOT_PATH, 'node_modules')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: appJsonObj.pluginArr,
  devtool: "cheap-source-map",
  cache: true
}
//webpack-dev-server 提供的是内存级别的server,不会生成build的文件夹
//访问路径直接参照build下的路径 如http://127.0.0.1:8080/shop/updateShop.html
module.exports = merge(commonConfig, {
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    host: process.env.HOST,
    port: "8808",
    proxy: {
      '/api/getLeftBar': {
        target: 'http://127.0.0.1:8808/mock',//dev
        secure: false
      },
      '/api/getIndexData': {
        target: 'http://127.0.0.1:8808/mock',//dev
        secure: false
      },
      '/api/getblogs': {
        target: 'http://127.0.0.1:8808/mock',//dev
        secure: false
      },
      '/panda/*': {
        target: 'http://10.4.233.139:8411/',//dev
        secure: false
      },
      //转发至本地mock
      '/page3/*': {
        target: 'http://127.0.0.1:8808',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:8808/test.html'
    })
  ]
});
