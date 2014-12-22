var gulp       = require('gulp'),
	bower      = require('bower-files')({
		join: {fonts: ['eot', 'woff', 'svg', 'ttf']}
	}),
	concat     = require('gulp-concat'),
	uglify     = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	minifyCSS  = require('gulp-minify-css'),
	jade       = require('jade'),
	stylus     = require('gulp-stylus'),
	fs         = require('fs'),
	YAML       = require('yamljs'),
	marked     = require('marked');

// Compile bower dependencies - run only when installing a new bower package.
gulp.task('bower', function() {
	gulp.src(bower.js)
		.pipe(concat('lib.min.js'))
		.pipe(sourcemaps.init('./'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/assets'));
	gulp.src(bower.css)
		.pipe(concat('lib.min.css'))
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(gulp.dest('./build/assets'));
	gulp.src(bower.fonts)
		.pipe(gulp.dest('./build/assets/fonts'));
});

var directories = ['build', 'build/assets', 'build/assets/fonts', 'build/assets/img'];

gulp.task('default', function() {
	directories.forEach(function(directory) {
		if(fs.existsSync(directory)) return;
		fs.mkdirSync(directory);
	})
	gulp.src('./assets/css/*')
		.pipe(stylus())
		.pipe(concat('common.min.css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/assets'));
	gulp.src('./assets/img/*')
		.pipe(gulp.dest('./build/assets/img'));
	gulp.src('./assets/js/*')
		.pipe(concat('common.min.js'))
		.pipe(sourcemaps.init('./'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/assets'));
	// todo: gulpify!
	var template = jade.compileFile('./views/page.jade', { pretty: true });
	fs.readdir('./content', function(err, files) {
		files.filter(function(f) { return f.substr(-2) == 'md'; }).forEach(function(file) {
			fs.readFile('./content/' + file, {encoding: 'utf8'}, function(err, data) {
				var header = /^-{4}([\s\S]+?)-{4}/.exec(data);
				var title = null;
				var content;
				var page = file.substr(0, file.length - 3);
				if(header && header[1])
				{
					var obj = YAML.parse(header[1]);
					title = obj['title'] || null;
					content = data.substr(header[1].length + 8).trim();
				}
				else
					content = data;
				var html = template({
					title: title,
					content: marked(content)
				});
				fs.writeFile('./build/' + page + '.html', html);
			});
		});
	});
});