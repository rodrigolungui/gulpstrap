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

/* Node modules */
var express = require('express'),
    app     = express(),
    http    = require('http').Server(app);

/* Gulp modules */
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch  = require('gulp-watch'),
    run    = require('gulp-sequence');


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
    .pipe(gulp.dest(Constraints.BUILD_SCRIPTS));
});

gulp.task('watch', function () {
    watch(Constraints.SRC_SCRIPTS, function () {
      gulp.start('teste');
    });

    watch(Constraints.SRC_STYLES, function(){
      gulp.start('styles');
    });
});

gulp.task('teste', run('scripts', 'compress'));

gulp.task('serve', function() {
  app.use(express.static(__dirname + '/app', { maxAge: 0 }));

  http.listen(8081, 'localhost', function(){
    console.log('Served in http://localhost:8081');
  });
});