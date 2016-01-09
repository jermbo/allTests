var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var wiredep = require('wiredep').stream;

var client = './src';

var config = {
  js: [
    client + '/js/**/*.js'
  ],
  bower: {
    json: require('./bower.json'),
    directory: './bower_components/',
    ignorePath: ''
  }
};

config.getWiredepDefaultOptions = function () {
  var options = {
    bowerJson: config.bower.json,
    directory: config.bower.directory,
    ignorePath: config.bower.ignorePath
  };
  return options;
};

gulp.task('default', ['']);


gulp.task('build', ['html', 'css', 'js']);

gulp.task('html', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('./dist'))
    ;
});

gulp.task('css', function () {

});

gulp.task('js', function () {
  return gulp.src('./src/**/*.js')
    .pipe(gulp.dest('./dist'));

});

gulp.task('wiredep', function () {
  var options = config.getWiredepDefaultOptions();

  return gulp.src('./src/index.html')
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest('./dist'))
    ;
});