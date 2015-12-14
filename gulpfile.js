var gulp = require('gulp');


require('require-dir')('gulp/tasks');

gulp.task('default', ["compile"]);

module.exports = gulp; //run gulp using gulp-devtools