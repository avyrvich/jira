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
			app: 'java -jar tools/SoyToJsSrcCompiler.jar --outputPathFormat app/js/templates/app.js --srcs templates/app.soy',
      settings: 'java -jar tools/SoyToJsSrcCompiler.jar --outputPathFormat app/js/templates/settings.js --srcs templates/settings.soy'
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
    },
    version: {
      defaults: {
        src: ['app/manifest.json']
      }
    }
  });

  grunt.loadNpmTasks('grunt-version');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-exec');

  
  grunt.registerTask('default', [
    //'version::minor',
    'clean',
    'exec',
    'less',
    'copy'
  ]);
};