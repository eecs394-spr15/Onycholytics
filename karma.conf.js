// Karma configuration
<<<<<<< Updated upstream
// Generated on Mon Jun 08 2015 12:39:50 GMT-0500 (CDT)
=======
// Generated on Fri Jun 05 2015 15:53:36 GMT-0500 (CDT)
>>>>>>> Stashed changes

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
<<<<<<< Updated upstream
        //'test/**/*Spec.js'
=======
      //'test/**/*Spec.js'
>>>>>>> Stashed changes
      '/Users/zhouqing/Onycholytics/bower_components/angular/angular.js',
      '/Users/zhouqing/Onycholytics/bower_components/angular-mocks/angular-mocks.js',
      '/Users/zhouqing/Onycholytics/dist/cloud-resources.js',
      //'https://hammerjs.github.io/dist/hammer.js',
      '/Users/zhouqing/Onycholytics/bower_components/supersonic/*.js',
      //'/Users/zhouqing/Onycholytics/dist/app/camera/scripts/*.js',
      //'https://hammerjs.github.io/dist/hammer.js',
      '/Users/zhouqing/Onycholytics/dist/app/*.js',
      '/Users/zhouqing/Onycholytics/test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
