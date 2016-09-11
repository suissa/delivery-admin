module.exports = function(config) {
  const DEPENDENCIES = require('wiredep')(require('../../package.json').wiredep);
  const APP_FILES = [
      'tests/angular/before.js',
      'src/bower_components/angular-mocks/angular-mocks.js',

      'src/app/**/*.module.js',
      'src/app/**/*!(module).js',

      'tests/angular/**/*.js'
  ];

  var userConfig = {
    basePath : '../../',

    files : DEPENDENCIES.js,

    preprocessors : {
      'src/app/**/*.js': 'coverage'
    },

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    reporters : ['progress', 'coverage'],

    plugins : [
      // 'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher'
    ],

    coverageReporter : {
      type : 'html',
      dir : 'coverage-angular/'
    }
  };

  userConfig.files = userConfig.files.concat(APP_FILES);

  userConfig.phantomjsLauncher = {
    exitOnResourceError: true
  };

  config.set(userConfig);
};
