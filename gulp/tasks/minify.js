var gulp 			=	require('gulp');
var minifyCSS =	require('gulp-minify-css');
var uglify 		= require('gulp-uglify');
var config 		=	require('../config');
var size 			= require('gulp-size');

gulp.task('minify-css', function() {
	return gulp.src('./public/assets/css/**/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(size({title : 'styles'}));
});

gulp.task('minify-js', function() {
	return gulp.src('./public/assets/js/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/assets/js'))
		.pipe(size({title : 'js'}));
});

gulp.task('minify', ['minify-css', 'minify-js']);