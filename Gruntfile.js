module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    version: '0.0.1',
    clean: [
      'release/**'
    ],
    copy: {
      main: {
        expand: true,
        cwd: 'app',
        src: '**',
        dest: 'release/',
      }
    },
		exec: {
			soy: 'java -jar tools/SoyToJsSrcCompiler.jar --outputPathFormat app/js/templates.js --srcs templates/templates.soy'
		},
    less: {
      production: {
        options: {
          cleancss: true
        },
        files: {
          "app/css/style.css": "templates/style.less",
          "app/css/content.css": "templates/content.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-exec');

  
  grunt.registerTask('default', [
    'clean',
    'exec:soy',
    'less',
    'copy'
  ]);
};