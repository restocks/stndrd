var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('scripts', function(done) {
  gulp.src('stndrd.js')
  .pipe(uglify({
    compress: true,
    mangle: false
  }))
   .pipe(gulp.dest('dist'))
   .on('end', done);
});

gulp.task('default', ['scripts']);
