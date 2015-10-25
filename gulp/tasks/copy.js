var gulp = require('gulp');
var copy = require('gulp-copy');

gulp.task('copy-dev', function() {
	return gulp.src(['./resources/assets/css/**/*.css', './resources/assets/js/**/*.js'])
		.pipe(copy('./public/assets'));
});