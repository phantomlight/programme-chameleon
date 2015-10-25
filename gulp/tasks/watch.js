var gulp 		=	require('gulp');
var config 	= require('../config');

gulp.task('watch-front', function() {
	gulp.watch(config.browserify.watch, ['browserify']);
	gulp.watch(config.sass_front.watch, ['sass-front', 'autoprefixer']);
	gulp.watch(config.images.src, ['images']);
});

gulp.task('watch-back', function() {
	gulp.watch(config.browserify.watch, ['browserify']);
	gulp.watch(config.sass_back.watch, ['sass-back', 'autoprefixer']);
	gulp.watch(config.images.src, ['images']);
});