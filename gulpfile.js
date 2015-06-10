var gulp = require('gulp');
var strip = require('gulp-strip-comments');
var removeEmptyLines = require('gulp-remove-empty-lines');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// just make it a little prettier, my source is a mess of comments.
gulp.task('build', function () {
  return gulp.src('./src/lang.js')
    .pipe(strip())
    .pipe(removeEmptyLines())
    .pipe(gulp.dest('dist'));
});

// minify for actual use (not really recommended for use, this is an experiment, go get lodash/_ :)
gulp.task('min', function() {
    return gulp.src('./dist/lang.js')
            .pipe(rename('lang.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
})

gulp.task('default', ['build', 'min']);
