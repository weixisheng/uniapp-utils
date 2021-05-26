const gulp = require('gulp')
const compiler = require('webpack')
const webpack = require('webpack-stream')

gulp.task('build', function () {
  return gulp
    .src('./src/index.js')
    .pipe(
      webpack(
        {
          mode: 'production',
          output: {
            filename: 'index.min.js',
            library: `@hishion_wei/uniapp-utils`,
            libraryTarget: 'umd'
          }
        },
        compiler,
        function () {}
      )
    )
    .pipe(gulp.dest('./lib'))
})

gulp.task('default', function () {
  gulp.watch(['src/*.js'], gulp.series('build'))
})
