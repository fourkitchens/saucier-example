(function (){
  var gulp = require('gulp');
      plumber = require('gulp-plumber'),
      preprocess = require('gulp-preprocess'),
      dust = require('gulp-dust'),
      concat = require('gulp-concat'),
      wrap = require('gulp-wrap');


  gulp.task('dust', function () {
    return gulp.src('_src/_templates/**/*.dust')
      .pipe(plumber())
      .pipe(preprocess())
      .pipe(dust({
        config: {
          whitespace: true
        }
      }))
      .pipe(concat('views.js', {newLine: ' \r\n  '}))
      .pipe(wrap({src: '_src/_utils/wrap.txt'}))
      .pipe(gulp.dest('public/templates'));
  });
})();
