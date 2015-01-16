'use strict';

/* Constraints */

var Constraints = {
  SRC_STYLES: "./app/styles/*.scss",
  BUILD_CSS: "./app/build/css"
}

var gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('styles', function(){
  gulp.src(Constraints.SRC_STYLES)
    .pipe(sass())
    .pipe(gulp.dest(Constraints.BUILD_CSS));
});