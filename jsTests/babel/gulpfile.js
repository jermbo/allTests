var gulp = require('gulp');
var connect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('connect', function(){
  connect.server({
    base : 'http://localhost',
    port: 9000,
    root :'./dist',
    livereload : true
  });
});

gulp.task('js', function(){
  browserify('./src/main.js')
    .transform(babelify)
    .bundle()
    .pipe(source('all.js'))
    .pipe(gulp.dest('./dist/scripts'))
    .pipe(connect.reload())
  ;
});

gulp.task('html', function(){
  gulp.src('./src/*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
  ;
});

gulp.task('default', ['js', 'html', 'connect'], function(){

});