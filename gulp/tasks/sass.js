var gulp 		=	require('gulp');
var sass    = require('gulp-sass');
var plumber =	require('gulp-plumber');
var csscomb =	require('gulp-csscomb');
var autoPrefixer = require('gulp-autoprefixer');
var size =	require('gulp-size');
var errors	= require('../util/handleErrors');
var logger	=	require('../util/bundleLogger');
var config_front 	= require('../config').sass_front;
var config_back 	= require('../config').sass_back;
var AUTOPREFIXER_BROWSERS = [ // https://github.com/ai/autoprefixer
			'ie >= 10',
			'ie_mob >= 10',
			'ff >= 30',
			'chrome >= 34',
			'safari >= 7',
			'opera >= 23',
			'ios >= 7',
			'android >= 4.4',
			'bb >= 10'
		];

gulp.task('sass-front', function() {
	var finished = function() {
		logger.end(config_front.dest + '/theme.css');
	};

	return gulp.src(config_front.src)
		.pipe(plumber())
		.pipe(sass())
		.on('error', errors)
		.pipe(csscomb())
		.pipe(autoPrefixer({browsers: AUTOPREFIXER_BROWSERS}))
		.pipe(gulp.dest(config_front.dest))
		.on('end', finished)
		.pipe(size({title: 'styles'}));
});

gulp.task('sass-back', function() {
	var finished = function() {
		logger.end(config_back.dest + '/back.css');
	};

	return gulp.src(config_back.src)
		.pipe(plumber())
		.pipe(sass())
		.on('error', errors)
		.pipe(csscomb())
		.pipe(autoPrefixer({browsers: AUTOPREFIXER_BROWSERS}))
		.pipe(gulp.dest(config_back.dest))
		.on('end', finished)
		.pipe(size({title: 'styles'}));
});