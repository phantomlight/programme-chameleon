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
		extensions: ['.js', '.json', '.es6'],
		watch: './resources/assets/js/{front,back}/**/*.js',
		bundleConfigs: [
		{
			entries: './resources/assets/js/front/app.js',
			dest: './public/assets/js',
			outputName: 'app.js'
		},
		{
			entries: './resources/assets/js/front/contractor.js',
			dest: './public/assets/js',
			outputName: 'contractor.js'
		},
		{
			entries: './resources/assets/js/front/company.js',
			dest: './public/assets/js',
			outputName: 'company.js'
		},
		{
			entries: './resources/assets/js/front/agency.js',
			dest: './public/assets/js',
			outputName: 'agency.js'
		},
		{
			entries: './resources/assets/js/back/app.js',
			dest:  './public/assets/js',
			outputName: '_app.js'
		}]
	},
	app: {
		src: './public/app/resources/',
		dest: './public/app/public/',
		watch: './public/app/resources/'
	}
};