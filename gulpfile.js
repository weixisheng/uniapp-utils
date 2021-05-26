const gulp = require('gulp')
const webpack = require('webpack-stream')

gulp.task('default', function () {
  return gulp
    .src(['./src/index.js'])
    .pipe(
      webpack({
        output: {
          filename: 'index.min.js',
          library: `@hishion_wei/uniapp-utils`,
          libraryTarget: 'umd'
        }
      })
    )
    .pipe(gulp.dest('./lib'))
})
