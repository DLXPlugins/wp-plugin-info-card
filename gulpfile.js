const gulp = require( 'gulp' );
const merge = require( 'merge-stream' );
const del = require( 'del' );
const run = require( 'gulp-run' );
const replace = require( 'gulp-string-replace' );

const fs = require( 'fs' );
const config = JSON.parse( fs.readFileSync( './package.json' ) );

gulp.task( 'run:build', function() {
	return run( 'npm run build' ).exec();
} );

gulp.task( 'bundle', function() {
	return gulp.src( [
		'**/*',
		'!bin/**/*',
		'!node_modules/**/*',
		'!vendor/**/*',
		'!composer.*',
		'!src/blocks.js',
		'!src/common.scss',
		'!src/block/**/*',
		'!package/**/*',
	] )
		.pipe( gulp.dest( 'package/prepare' ) );
} );

gulp.task( 'remove:bundle', function() {
	return del( [
		'package/trunk',
	] );
} );

gulp.task( 'wporg:prepare', function() {
	return run( 'mkdir -p package/trunk' ).exec();
} );

gulp.task( 'wporg:trunk', function() {
	return run( 'mv package/prepare/* package/trunk' ).exec();
} );

gulp.task( 'clean:bundle', function() {
	return del( [
		'package/trunk/package',
		'package/trunk/assets/wporg',
		'package/trunk/coverage',
		'package/trunk/js/blocks',
		'package/trunk/js/src',
		'package/trunk/bin',
		'package/trunk/node_modules',
		'package/trunk/vendor',
		'package/trunk/tests',
		'package/trunk/trunk',
		'package/trunk/gulpfile.js',
		'package/trunk/Makefile',
		'package/trunk/package*.json',
		'package/trunk/phpunit.xml.dist',
		'package/trunk/README.md',
		'package/trunk/CHANGELOG.md',
		'package/trunk/webpack.config.js',
		'package/trunk/.editorconfig',
		'package/trunk/.eslistignore',
		'package/trunk/.eslistrcjson',
		'package/trunk/.git',
		'package/trunk/.gitignore',
		'package/trunk/src/block',
		'package/prepare',
	] );
} );

gulp.task( 'default', gulp.series(
	'remove:bundle',
	'run:build',
	'bundle',
	'wporg:prepare',
	'wporg:trunk',
	'clean:bundle'
) );
