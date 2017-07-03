import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';

gulp.task('less', () => {
	return gulp.src('./src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./dist/css/'));
})

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
})

gulp.task('scripts', () => {
    return gulp.src([
        './src/js/**/*.js'
    ]).pipe(babel({"presets":["es2015"]}))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('images', () => {
	return gulp.src('./src/images/**/*.*')
		.pipe(gulp.dest('./dist/images'));
})

gulp.task('html', () => {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist'));
})

gulp.task('watch', () => {
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/*.html'], ['html']);
	gulp.watch(['./src/**/*.less'], ['less']);
});

gulp.task('default', ['html', 'less', 'bower', 'fonts', 'images', 'scripts', 'watch']);