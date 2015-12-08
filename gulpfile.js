var gulp = require('gulp'),
sass = require('gulp-ruby-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
htmlminify = require("gulp-minify-html"),
del = require('del');

gulp.task('styles', function() {
	return gulp.src('public/css/*.css', { style: 'expanded' })
	.pipe(concat('styles.css'))
	.pipe(autoprefixer('last 2 version'))
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('dist/assets/css'))
	.pipe(livereload())
	.pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
	return gulp.src(['public/javascript/**/*.js'])
	.pipe(concat('main.js'))
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(livereload())
	.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('templates' , function(){
	return gulp.src("public/templates/*.html")
	.pipe(htmlminify())
	.pipe(gulp.dest("dist/assets/templates"))
	.pipe(livereload())
	.pipe(notify({message:"HTML tasks complete"}));
});

// Clean
gulp.task('clean', function() {
	return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/templates']);
});
// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts', 'templates');
});

// Watch
gulp.task('watch', function() {
	livereload.listen({start: true});
	gulp.watch('public/css/*.css', ['styles']);
	gulp.watch('public/javascript/**/*.js', ['scripts']);
	gulp.watch('public/templates/*.html', ['templates']);
	gulp.watch(['dist/**']).on('change', livereload.changed);
});