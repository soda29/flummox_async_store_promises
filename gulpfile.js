var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify'); 
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var handleErrors = require('./gulp/util/handleErrors');
// var buffer       = require('vinyl-buffer');
var streamify = require('gulp-streamify');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var gutil = require('gulp-util');
var shell = require('gulp-shell');
var changed = require('gulp-changed');
var glob = require('glob');
var livereload = require('gulp-livereload');
var jasminePhantomJs = require('gulp-jasmine2-phantomjs');
var rename = require('gulp-rename');

// External dependencies you do not want to rebundle while developing,
// but include in your application deployment
var dependencies = [
    'react',
    'lodash',
    'superagent',

];

var browserifyTask = function (options) {

  // Our app bundler
    var appBundler = browserify({
        entries: [options.src], // Only need initial file, browserify finds the rest
     extensions: ['.jsx', '.js'],
      transform: [["babelify", { "optional": ['es7.asyncFunctions'] }]], // We want to convert JSX to normal javascript
      // transform: [babelify], // We want to convert JSX to normal javascript
          debug: options.development, // Gives us sourcemapping
          cache: {}, packageCache: {}, fullPaths: options.development // Requirement of watchify
    });

    // We set our dependencies as externals on our app bundler when developing      
    (options.development ? dependencies : []).forEach(function (dep) {
        appBundler.external(dep);
    });

  // The rebundle process
    var rebundle = function () {
        var start = Date.now();
        console.log('Building APP bundle');
        appBundler.bundle()
            .on('error', handleErrors)
            .pipe(source('main.js'))
            .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(gulpif(options.development, livereload()))
            .pipe(notify(function () {
                console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
            }));
    };

    // Fire up Watchify when developing
    if (options.development) {
        appBundler = watchify(appBundler);
        appBundler.on('update', rebundle);
    }
      
    rebundle();

  // We create a separate bundle for our dependencies as they
  // should not rebundle on file changes. This only happens when
  // we develop. When deploying the dependencies will be included 
  // in the application bundle
    if (!options.development) {
        // Remove react-addons when deploying, as it is only for
        // testing
        if (!options.development) {
            dependencies.splice(dependencies.indexOf('react-addons'), 1);
        }
    
        var vendorsBundler = browserify({
            debug: true,
            require: dependencies
        });
            
            // Run the vendor bundle
        var start = new Date();
        console.log('Building VENDORS bundle');
        vendorsBundler.bundle()
            .on('error', handleErrors)
            .pipe(source('vendors.js'))
            // .pipe(streamify(uglify()))
            // .pipe(gulpif(!options.development, streamify(uglify())))
            .pipe(gulp.dest(options.dest))
            .pipe(notify(function () {
                console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
            }));
    
  }
  
}

gulp.task('build', function() {
    browserifyTask({
        development: true,
        src: './app/main.js',
        dest: './build'
    });
  
});

gulp.task('deploy', function () {

    browserifyTask({
        development: false,
        src: './app/main.js',
        dest: './build'
    });


});


// Starts our development workflow
gulp.task('default', [ 'build']);