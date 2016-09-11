'use strict';

let gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    concat        = require('gulp-concat'),
    cssnano       = require('gulp-cssnano'),
    uglify        = require('gulp-uglify'),
    livereload    = require('gulp-livereload'),
    ngAnnotate    = require('gulp-ng-annotate'),
    htmlmin       = require('gulp-htmlmin'),
    stylus        = require('gulp-stylus'),
    templateCache = require('gulp-angular-templatecache'),
    wiredep       = require('wiredep');

let debug = require('debug')('delivery-admin:gulp');
let pkg = require('./package.json');

const DEPENDENCIES = wiredep(pkg.wiredep);

let css = {
  source: 'src/css/app.css',
  target: 'public/assets/css'
};
let js = {
  source: ['src/app/**/*.module.js', 'public/assets/js/templates.min.js', 'src/app/**/*!(module).js'],
  target: 'public/assets/js'
};

// debug('DEPENDENCIES.js', DEPENDENCIES, DEPENDENCIES.js);

// js.source = DEPENDENCIES.js.concat(js.source);
css.source = DEPENDENCIES.css.concat(css.source);


gulp.task('stylus', function () {
  return gulp.src('src/css/app.styl')
    .pipe(stylus({
        compress: true
      })
    )
    .pipe(gulp.dest('src/css/'));
});


gulp.task('css', ['stylus'], function () {
  return gulp.src(css.source)
    .pipe(cssnano({ discardComments: {removeAll: true} }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(css.target))
    .pipe(livereload());
});
gulp.task('js:vendor', function() {
  return gulp.src(DEPENDENCIES.js)
    .pipe(concat('vendors.min.js'))
    .pipe(uglify({ mangle: true }).on('error', gutil.log))
    .pipe(gulp.dest(js.target));
})
gulp.task('js:app', ['js:template'], function() {
  return gulp.src(js.source)
    .pipe(concat('all.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({ mangle: true }).on('error', gutil.log))
    .pipe(gulp.dest(js.target))
    .pipe(livereload());
});


gulp.task('js:template', function() {
  return gulp.src('src/app/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: '/',
      filename: 'templates.min.js'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(js.target))
    .pipe(livereload());
});


gulp.task('js', ['js:app', 'js:vendor']);

gulp.task('default', ['css', 'js']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/css/**/*.styl', ['css']);
  gulp.watch('src/app/**/*.js', ['js:app']);;
  gulp.watch('src/app/**/*.html', ['js:app']);
});
