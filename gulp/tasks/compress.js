var config = require('../config');

var gulp = require('gulp');
var newer = require('gulp-newer');
var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegoptim = require('imagemin-jpegoptim');
// var path = require('path');
var print = require('gulp-print')
// var imageResize = require('gulp-image-resize')


gulp.task('compress', ['compress:sprite', 'compress:assets']);
gulp.task('compress:sprite', ['compress:sprite:ttl']);

//Create sprites with spritesmith
gulp.task('compress:sprite:ttl', function () {
    var imageDir = config.srcDir + '/img';
    var stylDir = config.srcDir + '/stylus/sprites';
    var spriteDir = imageDir + '/sprites';

    var sprites = gulp.src(imageDir + '/ttl_*.png').pipe(spritesmith({
        cssName: 'sprites_ttl.styl',
        imgName: 'sprites_ttl.png',
        algorithm: 'top-down',
        // padding: 2,
        cssVarMap: function (sprite) {
            sprite.name = 'sprite_' + sprite.name;
        },
        cssTemplate: stylDir + '/sprite.template.mustache'
    }));
    sprites.img
        .pipe(gulp.dest(spriteDir));
    sprites.css
        .pipe(gulp.dest(stylDir));
});

//Output assets
gulp.task('compress:assets', function(){
    var glob = config.srcDir + '/img/**/*.+(jpg|jpeg|png|gif|svg)';
    var target = config.projectRoot + '/img';
    return gulp.src(glob)
        .pipe(newer(target))
        .pipe(print())
        .pipe(imagemin({
            optimizationLevel: 7,
            progressive: true,
            svgoPlugins: [
                { removeViewBox: true },                 // remove the viewbox atribute from the SVG
                { removeUselessStrokeAndFill: true },    // remove Useless Strokes and Fills
                { removeEmptyAttrs: true }               // remove Empty Attributes from the SVG
            ],
            use: [pngquant({ quality: '40-80', speed: 4 })]
        }))
        .pipe(gulp.dest(target));
});