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
	return gulp.src('app/**/*.styl')
		.pipe(stylus())
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('built/css/'));
});

gulp.task('watch:styl', function(){
	return gulp.src('app/**/*.styl')
		.pipe(watch('app/**/*.styl', {verbose: true}))
		.pipe(plumber())
    .pipe(stylus())
		.pipe(sourcemaps.init())
		.pipe(postcss([ autoprefixer() ]))
		.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('built/css/'));
});



// Clean Tasks
// clean:build is usually sufficient

gulp.task('clean:all', ['clean:app', 'clean:build', 'clean:npm']);
gulp.task('clean:app', function(){
	return clean([
		'app/**/*.js',
		'app/**/*.map']);
});
gulp.task('clean:build', function(){
	return clean([
		'built/css/*',
		'built/js/*']);
});
gulp.task('clean:npm', function(){
	return clean([
		'node_modules/**',
		'npm-debug.log*']);
});
