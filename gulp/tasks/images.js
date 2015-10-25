var gulp 		=	require('gulp');
var browserSync = require('browser-sync');
var changed =	require('gulp-changed');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var config 	=	require('../config').images;
var errors	=	require('../util/handleErrors');

gulp.task('images', function() {
	return gulp.src(config.src)
	.pipe(imagemin()).on('error', errors)
	.pipe(gulp.dest(config.dest))
	.pipe(size({title: 'images'}))
	.pipe(browserSync.reload({stream:true}));
});