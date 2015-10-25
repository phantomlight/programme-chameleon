var runSequence = require('run-sequence');
var gulp = require('gulp');

gulp.task('dev-front', function() {
	runSequence(
		'browserify',
		'concat-front',
		'sass-front',
		'images',
		'autoprefixer');
});

gulp.task('dev-back', function() {
	runSequence(
		'browserify',
		'concat-back',
		'sass-back',
		'images',
		'autoprefixer');
});

gulp.task('default', function() {
	runSequence(
		'browserify',
		'sass-front',
		'autoprefixer',
		'watch-front');
});

gulp.task('back', function() {
	runSequence(
		'browserify',
		'sass-back',
		'autoprefixer',
		'watch-back');
});

gulp.task('dist', function() {
	runSequence(
		'browserify',
		'sass-front',
		'sass-back',
		'autoprefixer',
		'minify',
		'images');
});