var gulp = require('gulp');
var path = require('path');
var config = require('../config');
var runSeq = require('run-sequence')


gulp.task('watch', ['watch:jade', 'watch:js', 'watch:stylus']);

gulp.task('watch:jade', function(){
    var globs = path.join(config.srcDir, '**/*.jade')

    gulp.watch(globs, ['compile:jade'])
});

gulp.task('watch:stylus', function(){
    var globs = path.join(config.srcDir, '**/*.styl')

    gulp.watch(globs, ['compile:stylus'])
});

gulp.task('watch:js', function(){
    var globs = path.join(config.srcDir, '**/*.js')

    gulp.watch(globs, ['compile:js'])
});