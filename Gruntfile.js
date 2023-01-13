module.exports = function( grunt ) {
	grunt.initConfig( {
		compress: {
			main: {
				options: {
					archive: 'wp-plugin-info-card.zip',
				},
				files: [
					{ src: [ 'readme.txt' ], dest: '/', filter: 'isFile' },
					{ src: [ 'wp-plugin-info-card.php' ], dest: '/', filter: 'isFile' },
					{ src: [ 'functions.php' ], dest: '/', filter: 'isFile' },
					{ src: [ 'uninstall.php' ], dest: '/', filter: 'isFile' },
					{ src: [ 'assets/**' ], dest: '/' },
					{ src: [ 'build/**' ], dest: '/' },
					{ src: [ 'dist/**' ], dest: '/' },
					{ src: [ 'langs/**' ], dest: '/' },
					{ src: [ 'lib/**' ], dest: '/' },
					{ src: [ 'php/**' ], dest: '/' },
					{ src: [ 'templates/**' ], dest: '/' },
				],
			},
		},
	} );
	grunt.registerTask( 'default', [ 'compress' ] );

	grunt.loadNpmTasks( 'grunt-contrib-compress' );
};
