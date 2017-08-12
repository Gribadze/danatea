import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import uglify from 'uglify-js';
import composer from 'gulp-uglify/composer';
import pump from 'pump';
import image from 'gulp-image';
import cleanCSS from 'gulp-clean-css';

const minify = composer(uglify, console)

gulp.task('less', () => {
	return gulp.src('./src/less/*.less')
		.pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css/'));
});

gulp.task('bower', () => {
	return gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap/dist/js/bootstrap.js',
		'./bower_components/jquery.easing/js/jquery.easing.js'
	])
	.pipe(gulp.dest('./dist/js/'));
});

gulp.task('fonts', () => {
	return gulp.src([
		'./bower_components/bootstrap/dist/fonts/*.*',
		'./bower_components/font-awesome/fonts/*.*',
        './src/fonts/*.*'
	]).pipe(gulp.dest('./dist/fonts'));
});

gulp.task('scripts', () => {
    return gulp.src([
        './src/js/**/*.js'
    ]).pipe(babel({"presets":["es2015"]}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', () => {
	return gulp.src('./src/images/**/*.*')
        .pipe(image())
		.pipe(gulp.dest('./dist/images'));
});

gulp.task('html', () => {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/*.html'], ['html']);
	gulp.watch(['./src/**/*.less'], ['less']);
});

gulp.task('compress', () => {
    pump([
        gulp.src('./src/js/*.js'),
        minify(),
        gulp.dest('./dist/js')
    ]);
});

gulp.task('default', ['html', 'less', 'bower', 'fonts', 'images', 'scripts', 'watch']);

gulp.task('build', ['html', 'less', 'bower', 'fonts', 'images', 'scripts']);