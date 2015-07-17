var gulp = require('gulp'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	soy = require('gulp-soy'),
	less = require('gulp-less'),
	path = require('path');

// less task
gulp.task('less', function() {
	return gulp.src('./templates/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('./app/css'))
		.pipe(notify({
			message: "Less convert to css!"
		}));
});
// uglify task
gulp.task('js', function() {
	// main app js file
	gulp.src('./app/js/**/*.js')
		.pipe(concat("main.js"))
		.pipe(gulp.dest('./app'))
		.pipe(notify({
			message: "Javascript is now ugly!"
		}))
});
// soy task
gulp.task('soy', function() {
	gulp.src('./templates/*.soy')
		.pipe(soy())
		.pipe(concat("templates.js"))
		.pipe(gulp.dest('./app/js'))
		.pipe(notify({
			message: "Soy templates is ready now!"
		}))
});
gulp.task('watch', function() {
	// watch less files
	gulp.watch('./templates/**/*.scss', function() {
		gulp.run('less');
	});
	// watch js files
	gulp.watch('./app/js/**/*.js', function() {
		gulp.run('js');
	});
	// watch soy files
	gulp.watch('./templates/**/*.soy', function() {
		gulp.run('soy');
	});
});
gulp.task('default', ['less', 'soy', 'js', 'watch']);