var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('autoprefixer', function () {
	return gulp.src(['./public/css/app.css', './public/css/admin.css'])
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer-app', function() {
	return gulp.src('./public/app/public/app.css')
	.pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(gulp.dest('dist'));
});