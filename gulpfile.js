/**
 *
 *  Adapted from Google's Web Starter Kit 0.4.0
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// Copy All Files At The Root Level (www)
gulp.task('copy', function () {
  return gulp.src(['www/**/*','!www/*.html'])
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/assets/fonts/**'])
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('www/assets/img/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/img'))
    .pipe($.size({title: 'images'}));
});

// Automatically Prefix CSS
gulp.task('autoprefixer', function () {
  return gulp.src('www/assets/css/*.css')
    // .pipe($.changed('www/assets/css'))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe($.size({title: 'autoprefixer'}));
});

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  return gulp.src('www/**/*.html')
    .pipe($.useref.assets({searchPath: '{.tmp,www}'}))
    // Remove Any Unused CSS
    .pipe($.if('*.css', $.uncss({
      html: [
        'www/index.html',
        'www/about/index.html',
        'www/faqs/index.html',
        'www/blog/*.html'
      ],
      // html: glob.sync('*.html', '**/*.html'),
      // CSS Selectors for UnCSS to ignore
      ignore: [
        '.Expand-menu.is-flat',
        '.Tabs.is-expanded'
      ]
    })))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe($.useref.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml()))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  runSequence('autoprefixer', ['images', 'fonts', 'copy'], cb);
});

