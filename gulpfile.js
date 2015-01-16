'use strict';

/* Constraints */

var Constraints = {
  /* Styles constraints */
  SRC_STYLES: "./app/styles/*.scss",
  BUILD_CSS: "./app/build/css",

  /* Scripts constraints */
  SRC_SCRIPTS: "./app/scripts/*.js",
  BUILD_SCRIPTS: "./app/build/js"
}


/* Gulp modules */
var gulp = require('gulp'),
    sass = require('gulp-sass');


gulp.task('styles', function(){
  gulp.src(Constraints.SRC_STYLES)
    .pipe(sass())
    .pipe(gulp.dest(Constraints.BUILD_CSS));
});