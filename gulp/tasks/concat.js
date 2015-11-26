var gulp = require('gulp');
var concat = require('gulp-concat');
var errors	= require('../util/handleErrors');
var sourcemaps = require('gulp-sourcemaps');

var front_main_libs = [
	'./plugins/jcryption.min.js',
	'./plugins/parsley.min.js',
	'./plugins/holder.js',
	'./plugins/jquery/ui/core.js',
	'./plugins/jquery/ui/widget.js',
	'./plugins/jquery/ui/mouse.js',
	'./plugins/jquery/ui/slider.js',
	'./plugins/jquery/jquery.select-to-ui-slider.js',
	'./plugins/imageLiquid.js',
	'./plugins/minimalect.js',
	'./plugins/jquery/ui/tabs.js',
	'./plugins/jquery/ui/effects.js',
	'./plugins/jquery/ui/effects-fade.js',
	'./plugins/bootstrap/bootstrap-tagsinput.js',
	'./plugins/bootstrap/bootstrap-datepicker.js',
	'./plugins/summernote.js',
];

var back_libs = [
	'./plugins/jcryption.min.js',
	'./plugins/parsley.min.js',
	'./plugins/holder.js',
	'./plugins/jquery/jquery.metismenu.js',
	'./plugins/jquery/jquery.slimscroll.js',
	'./plugins/pace.min.js',
	'./plugins/jquery/jquery.footable.js',
	'./plugins/jquery/exportTable/jquery.base64.js',
	'./plugins/jquery/exportTable/tableExport.js',
	'./plugins/bootstrap/bootstrap-datepicker.js',
	'./plugins/summernote.js',
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