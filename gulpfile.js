var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var clean = require('del');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

// Default Gulp
gulp.task('default', ['styl']);
gulp.task('watch', ['watch:styl']);



// Render Stylus
gulp.task('styl', function(){
	return gulp.src('public/**/*.styl')
		.pipe(stylus())
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('public/'));
});

gulp.task('watch:styl', function(){
	return gulp.src('public/**/*.styl')
		.pipe(watch('public/**/*.styl', {verbose: true}))
		.pipe(plumber())
    	.pipe(stylus())
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
    	.pipe(gulp.dest('public/'));
});



// Clean Tasks
// clean:build is usually sufficient

gulp.task('clean:all', ['clean:typings', 'clean:css', 'clean:js']);
gulp.task('clean:build', ['clean:css', 'clean:js']);
gulp.task('clean:app', function(){
	return clean([
		'app/**/*.js',
		'app/**/*.map']);
});
gulp.task('clean:js', function(){
	return clean([
		'public/app/**/*.map',
		'public/app/**/*.js'
	]);
});

gulp.task('clean:css', function(){
	return clean([
		'public/**/*.css',
		'public/**/*.map'
	]);
});

gulp.task('clean:typings', function(){
	return clean([
		'typings'
  ]);
});
