var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var HappyPack = require('happypack');
var merge = require('webpack-merge');
var webpack = require('webpack');
var WebpackMd5Hash = require('webpack-md5-hash');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


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
    var entry = element.entry;
    //通过对app.json中src的路径截取获得分发路径

    var filename = (function () {
      var filenameStr = entry.split("./app/entries/")[1];
      return filenameStr.substr(0, filenameStr.lastIndexOf("."));
    })();

    var title = element.title;
    var extra = element.extra;

    resultObj.entryObj[filename] = entry;

    //利用路径一部分来进行HtmlwebpackPlugin的chunks
    resultObj.pluginArr.push(
        new HtmlwebpackPlugin({
          chunks: [filename], //当前页面js
          title: title,
          extra: extra,//包含页面额外的配置信息
          template: "app/" + "template.ejs",
          filename: filename + '.html',
          chunksSortMode: "dependency" //按chunks的顺序对js进行引入
        })
    );

    //HappyPack, loader多进程去处理文件
    resultObj.pluginArr.push(
      new HappyPack({ id: 'html' }),
      new HappyPack({ id: 'css' }),
      new HappyPack({ id: 'js' }),
      new HappyPack({ id: 'tpl' })
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
      { test: /\.html$/, loader: "html?minimize=false", happy: {id: "html"} },
      { test: /\.json$/, loader: "json" },
      { test: /\.scss|\.css$/, loaders: ["style", "css", "sass"], happy: {id: "css"} },
      { test: /\.(?:jpg|gif|png)$/, loader: 'url?limit=10240&name=images/[name]-[hash:10].[ext]' },
      { test: /\.handlebars/, loader: "handlebars", query: { helperDirs: [APP_PATH + "/helper"] }, happy: {id: "tpl"} },
      { test: /\.js$|\.jsx$/, exclude: /(node_modules|bower_components)/, loader: 'babel', query: { presets: ['es2015','stage-3','react'] }, happy: {id: "js"} }
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: "js/[name].js"
  },
  externals: {
    "React": "react"
  },
  //配置短路径引用
  resolve: {
    alias: {
      module: path.resolve(APP_PATH, 'module'),
      service: path.resolve(APP_PATH, "service"),
      component: path.resolve(APP_PATH, "component"),
      page: path.resolve(APP_PATH, "page"),
      node_modules: path.resolve(ROOT_PATH, 'node_modules')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: appJsonObj.pluginArr,
  cache: true
}

//删除build目录
exec('rm -rf build', function(err, out) {
  console.log(out); err && console.log(err);
});
//删除image目录
exec('rm -rf images', function(err, out) {
  console.log(out); err && console.log(err);
});

module.exports = merge(commonConfig, {
  output: {
    publicPath: '//127.0.0.1:8808/ant-learn02/build/',
    path: BUILD_PATH,
    filename: "js/[name]-[chunkhash:10].js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
});
