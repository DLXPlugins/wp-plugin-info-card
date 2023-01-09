module.exports = function (grunt) {
	grunt.initConfig({
		compress: {
			main: {
			  options: {
				archive: 'wp-plugin-info-card.zip'
			  },
			  files: [
				{src: ['readme.txt'], dest: '/', filter: 'isFile'},
				{src: ['wp-plugin-info-card.php'], dest: '/', filter: 'isFile'},
				{src: ['build/**'], dest: '/'},
				{src: ['dist/**'], dest: '/'},
				{src: ['langs/**'], dest: '/'},
				{src: ['src/**'], dest: '/'},
			  ]
			}
		  }
	  });
	  grunt.registerTask('default', ["compress"]);



	grunt.loadNpmTasks( 'grunt-contrib-compress' );

 };
