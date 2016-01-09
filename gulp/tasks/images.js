var gulp 		=	require('gulp');
var browserSync = require('browser-sync');
var changed =	require('gulp-changed');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var config 	=	require('../config');
var errors	=	require('../util/handleErrors');

gulp.task('images', function() {
	return gulp.src(config.images.src)
	.pipe(imagemin()).on('error', errors)
	.pipe(gulp.dest(config.images.dest))
	.pipe(size({title: 'images'}))
	.pipe(browserSync.reload({stream:true}));
});


gulp.task('images-app', function () {
	return gulp.src(config.app.src + 'images/**/*.{png,gif,jpg,jpeg}')
	.pipe(imagemin()).on('error', errors)
	.pipe(gulp.dest(config.app.dest + 'images'))
	.pipe(size({title: 'images'}))
	.pipe(browserSync.reload({stream:true}));
});