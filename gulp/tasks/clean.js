var gulp 	=	require('gulp');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');

gulp.task('clean', function () {
	runSequence('clean-css','clean-js');
});

gulp.task('clean-js', function (cb) {
	rimraf('./public/assets/js', cb);
});


gulp.task('clean-css', function (cb) {
	rimraf('./public/assets/css', cb);
});