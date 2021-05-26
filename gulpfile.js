const gulp = require('gulp')
const babel = require('gulp-babel')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')

gulp.task('default', function () {
  return gulp.src('./src/index.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./lib'))
})