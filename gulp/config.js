module.exports = {
	images: {
		src: './resources/assets/img/**/*.{png,gif,jpg,jpeg}',
		dest: './public/assets/img'
	},
	sass_front: {
		src: ['./resources/assets/sass/theme.scss', './resources/assets/sass/plugins.scss'],
		dest: './public/assets/css',
		watch: './resources/assets/sass/**/*.scss'
	},
	sass_back: {
		src: ['./resources/assets/sass/back.scss', './resources/assets/sass/summernote.scss', './resources/assets/sass/back_plugins.scss'],
		dest: './public/assets/css',
		watch: './resources/assets/sass/**/*.scss'
	},
	browserify: {
		debug: true,
		extensions: ['.js'],
		watch: './resources/assets/js/{front,back}/**/*.js',
		bundleConfigs: [
		{
			entries: './resources/assets/js/front/app.js',
			dest: './public/assets/js',
			outputName: 'app.js'
		},
		{
			entries: './resources/assets/js/back/app.js',
			dest:  './public/assets/js',
			outputName: '_app.js'
		}]
	}
};