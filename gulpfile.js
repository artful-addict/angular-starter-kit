'use strict';

var			  gulp = require('gulp'),
			concat = require('gulp-concat'),
			uglify = require('gulp-uglify'),
			rename = require('gulp-rename'),
			  sass = require('gulp-sass'),
			  maps = require('gulp-sourcemaps'),
			   del = require('del');

gulp.task('concatScripts', function() {
	return gulp.src([
					 'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
					])
		.pipe(maps.init())
		.pipe(concat('app.js'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest9('js'))
});

gulp.task('minifyScripts', ['concatScripts'], function() {
	return gulp.src('js/app.js')
		.pipe(uglify())
		.pipe(rename('app.min.js'))
		.pipe(gulp.dest('js'))
});

gulp.task('compileSass', function() {
	return gulp.src('scss/manifest.scss')
		.pipe(maps.init())
		.pipe(sass())
		.pipe(rename('styles.css'))
		.pipe(maps.write('./'))
		.pipe(gulp.dest('css'))
});

gulp.task('watchFiles', function() {
	gulp.watch('scss/**/*.scss', ['compileSass']);
	// gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
	del(['dist', 'css/styles.css*', 'js/app.*.js*']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], function() {
	return gulp.src(['css/styles.css', 'js/app.min.js', 'index.html', 'img/**'], { base: './'})
		.pipe(gulp.dest('dist'))
});

gulp.task('serve', ['watchFiles']);

gulp.task('default', ['build'], function() {
	gulp.start('build');
})