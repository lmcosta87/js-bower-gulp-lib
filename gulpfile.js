var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var spa = require('browser-sync-spa');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifySaveLicense = require('uglify-save-license');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');

var browserSyncConf = {
  server: {
    baseDir: [
      'src',
      'demo'
    ],
    routes: {
      '/bower_components': 'bower_components',
      '/src': 'src'
    }
  },
  // snippetOptions: {
  //   rule: {
  //     match: /qqqqqqqqq/
  //   }
  // },
  open: false,
  cors: true,
  ghostMode: false
};
var browserSyncDistConf = {
  server: {
    baseDir: [
      'dist',
      'demo/dist'
    ],
    routes: {
      '/bower_components': 'bower_components',
      '/dist': 'dist'
    }
  },
  open: false,
  cors: true,
  ghostMode: false
};
browserSync.use(spa());

gulp.task('clean', clean);
gulp.task('build', gulp.series('clean', build));
gulp.task('serve', gulp.series(watch, browserSyncServe));
gulp.task('serve:dist', gulp.series('build', browserSyncServeDist));

function errorHandler(title) {
  return function (err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
}

function browserSyncServe(done) {
  browserSync.init(browserSyncConf);
  done();
}

function browserSyncServeDist(done) {
  browserSync.init(browserSyncDistConf);
  done();
}

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch([
    'demo/index.html',
    'bower.json'
  ], reloadBrowserSync);

  gulp.watch(('src/**/*.js'), reloadBrowserSync);
  done();
}

function clean() {
  return del('dist');
}

function build() {
  return gulp.src(['src/jsLibrary.js', 'src/**/*.js'])
    .pipe(concat('jsLibrary.js'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(gulp.dest('dist'))
    .pipe(concat('jsLibrary.min.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify({output: {comments: uglifySaveLicense}})).on('error', errorHandler('Uglify'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('dist'));
}
