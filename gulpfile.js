var gulp = require('gulp')
	,coffee = require('gulp-coffee')
	,gutil = require('gulp-util');


gulp.task('coffee',function() {
	gulp.src('./src/*.coffee')
		.pipe(coffee({bare: true}).on('error', gutil.log))
    	.pipe(gulp.dest('./script'));
});
gulp.task('default', function() {
	gulp.watch("./src/*.coffee",function() {
		gulp.run('coffee');
	});
});