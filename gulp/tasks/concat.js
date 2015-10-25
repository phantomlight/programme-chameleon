var gulp = require('gulp');
var concat = require('gulp-concat');
var errors	= require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');

var front_main_libs = [
	'./plugins/jcryption.min.js',
	'./plugins/parsley.min.js',
	'./plugins/jquery/ui/core.js',
	'./plugins/jquery/ui/widget.js',
	'./plugins/jquery/ui/mouse.js',
	'./plugins/jquery/ui/slider.js',
	'./plugins/jquery/jquery.select-to-ui-slider.js',
	'./plugins/owl-carousel.js',
	'./plugins/imageLiquid.js',
	'./plugins/minimalect.js',
	'./plugins/jquery/ui/tabs.js',
	'./plugins/jquery/ui/effects.js',
	'./plugins/jquery/ui/effects-fade.js',
	'./plugins/jquery/jquery.form.js',
];

var back_libs = [
	'./plugins/jcryption.min.js',
	'./plugins/parsley.min.js',
];

// Concat Frontend libs
gulp.task('concat-front', function() {
	return gulp.src(front_main_libs)
		.pipe(concat('theme.js'))
		.pipe(gulp.dest('./public/assets/js/'));
});

// Concat Backend Libs
gulp.task('concat-back', function() {
	return gulp.src(back_libs)
		.pipe(concat('_theme.js'))
		.pipe(gulp.dest('./public/assets/js/'));
});