var gulp = require('gulp');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var plumber = require('gulp-plumber');
var nib = require('nib');
var csso = require('gulp-csso');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var print = require('gulp-print')
var path = require('path');
var config = require('../config');


gulp.task('compile', ['compile:stylus', 'compile:jade', 'compile:js']);

/**
 * compile stylus files
 */
gulp.task('compile:stylus', function(){
    var globs = config.srcDir + '/stylus/style.styl'

    return gulp.src(globs)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
          compress: true,
          error: true,
          use: [nib()]
        }))
        // .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.projectRoot))
        .on('error', function(err){
            console.error(err)
        })
})

/**
 * compile jade files
 */
gulp.task('compile:jade', function(){
    var glob = config.srcDir + '/**/*.jade';

    gulp.src(glob)
        .pipe(plumber())
        .pipe(jade({}))
        .pipe(gulp.dest(config.projectRoot))
})

/**
 * compile js
 */
gulp.task('compile:js', function(){
    var scripts = [
        path.join(config.bowerDir,'jquery-smooth-scroll/jquery.smooth-scroll.min.js'),
        path.join(config.bowerDir,'lity/dist/lity.js'),
        path.join(config.bowerDir,'ionsound/js/ion.sound.min.js'),
        path.join(config.srcDir,'js/index.js')
    ];
    // console.log(scripts);
    return gulp.src(scripts)
        .pipe(print())
        .pipe(concat('common.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.projectRoot + '/js'));
})