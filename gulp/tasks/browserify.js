var gulp 				=	require('gulp');
var browserify	= require('browserify');
var babelify 		= require('babelify');
var watchify 		= require('watchify');
var source			=	require('vinyl-source-stream');
var logger			=	require('../util/bundleLogger');
var errors			=	require('../util/handleErrors');
var config			=	require('../config').browserify;

gulp.task('browserify', function(callback) {
	var bundleQueue = config.bundleConfigs.length;
	var browserifyThis = function(bundleConfig) {
		var bundler = browserify({
			cache: {},
			packageCache: {},
			fullPaths: true,
			entries: bundleConfig.entries,
			extensions: config.extensions,
			debug: config.debug
		});

		var bundle = function() {
			logger.start(bundleConfig.outputName);

			return bundler
				.transform(babelify)
				.bundle()
				.on('error', errors)
				.pipe(source(bundleConfig.outputName))
				.pipe(gulp.dest(bundleConfig.dest))
				.on('end', finished);
		}

		if (global.isWatching) {
			bundler = watchify(bundler);
			bundler.on('update', bundle);
		}

		var finished = function() {
			logger.end(bundleConfig.outputName);
			if (bundleQueue) {
				bundleQueue--;
				if (bundleQueue === 0) {
					callback();
				}
			}
		}
		
		return bundle();
	};

	config.bundleConfigs.forEach(browserifyThis);
});