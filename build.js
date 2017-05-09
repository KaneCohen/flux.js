var fs = require('fs');
var path = require('path');
let watch = require('watch');
var webpack = require('webpack');

var targets = [
  {
    entry: './index.js',
    target: 'web',
    node: {
      fs: 'empty'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'flux.min.js',
      library: 'Flux'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'lib')
          ],
          use: ['babel-loader', 'eslint-loader']
        }
      ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  },
  {
    entry: './index.js',
    target: 'node',
    node: {
      fs: 'empty'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'flux.js',
      sourceMapFilename: 'flux.map.js',
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, 'lib')
          ],
          use: ['babel-loader', 'eslint-loader']
        }
      ]
    },
    plugins: [
    ]
  }
];

watch.watchTree('lib', {
    ignoreDotFiles: true,
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
  }, function() {
    compile();
  });

function compile() {
  targets.forEach(function(target) {
    var config = Object.assign({}, target);

    webpack(config).run(function(err, stats) {
      console.log('Generating minified bundle for production use via Webpack...');

      if (err) {
        console.log(err);
        return 1;
      }

      var jsonStats = stats.toJson();

      if (jsonStats.hasErrors) return jsonStats.errors.map(function(error) { return console.log(error); });

      if (jsonStats.hasWarnings) {
        console.log('Webpack generated the following warnings: ');
        jsonStats.warnings.map(function(warning) { return console.log(warning); });
      }

      console.log('Webpack stats: ' + stats.toString());

      //if we got this far, the build succeeded.
      console.log('Package has been compiled into /dist.');
      return 0;
    });
  });
}
