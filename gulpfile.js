'use strict';

/* Constraints */

var Constraints = {
  /* Styles constraints */
  SRC_STYLES: "./app/styles/*.scss",
  BUILD_CSS: "./app/build/css",

  /* Scripts constraints */
  SRC_SCRIPTS: "./app/scripts/*.js",
  BUILD_SCRIPTS: "./app/build/js",
  MAIN_SCRIPT: "main.js",
  MAIN_SCRIPT_PATH: "./app/build/js/main.js",

  /* Vendor scripts */
  VENDOR_SCRIPTS: ['./app/vendor/jquery/dist/jquery.min.js']
}

/* Gulp modules */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


gulp.task('styles', function(){
  gulp.src(Constraints.SRC_STYLES)
    .pipe(sass())
    .pipe(gulp.dest(Constraints.BUILD_CSS));
});

gulp.task('scripts', function(){
  gulp.src(Constraints.VENDOR_SCRIPTS.concat(Constraints.SRC_SCRIPTS))
    .pipe(concat(Constraints.MAIN_SCRIPT))
    .pipe(gulp.dest(Constraints.BUILD_SCRIPTS));
});

gulp.task('compress', function() {
  gulp.src(Constraints.MAIN_SCRIPT_PATH)
    .pipe(uglify())
    .pipe(rename(function(path) {
      if(path.extname === '.js') {
        path.basename += '.min';
      }
    }))
    .pipe(gulp.dest(Constraints.BUILD_SCRIPTS))
});