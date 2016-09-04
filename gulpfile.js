'use strict';

let gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    concat        = require('gulp-concat'),
    cssnano       = require('gulp-cssnano'),
    uglify        = require('gulp-uglify'),
    livereload    = require('gulp-livereload'),
    ngAnnotate    = require('gulp-ng-annotate'),
    htmlmin       = require('gulp-htmlmin'),
    templateCache = require('gulp-angular-templatecache'),
    wiredep       = require('wiredep');

let debug = require('debug')('delivery-admin:gulp');
let pkg = require('./package.json');

const DEPENDENCIES = wiredep(pkg.wiredep);

let css = {
  source: 'src/css/**/*.css',
  target: 'public/assets/css'
};
let js = {
  source: ['src/app/**/*.module.js', 'public/assets/js/templates.min.js', 'src/app/**/*!(module).js'],
  target: 'public/assets/js'
};

// debug('DEPENDENCIES.js', DEPENDENCIES, DEPENDENCIES.js);

js.source = DEPENDENCIES.js.concat(js.source);
css.source = DEPENDENCIES.css.concat(css.source);

gulp.task('css', function () {
  return gulp.src(css.source)
    .pipe(cssnano())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(css.target))
    .pipe(livereload());
});
gulp.task('js:app', ['js:template'], function() {
  return gulp.src(js.source)
    .pipe(concat('all.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({ mangle: true }).on('error', gutil.log))
    .pipe(gulp.dest(js.target))
    .pipe(livereload());
});


gulp.task('js:template', function() {
  return gulp.src('src/app/{_layout,_templates,customers,dashboard,orders,products}/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(templateCache({
      root: '/',
      filename: 'templates.min.js'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(js.target))
    .pipe(livereload());
});


gulp.task('js', ['js:app']);

gulp.task('default', ['css', 'js']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/app/**/*.js', ['js:template', 'js']);;
  gulp.watch('src/app/**/*.html', ['js:template', 'js']);
});
