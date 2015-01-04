module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'examples/assets/js/*.js']
    },
    uglify: {
      options: {
        banner: '/****************************************************\n' +
                '<%= pkg.name %> v<%= pkg.version %>\n' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                'Fork me on Github:\n' +
                'https://github.com/rafaelcamargo/unpredictablegallery\n' +
                '*****************************************************/\n'
      },
      my_target: {
        files: {
          'releases/<%= pkg.name %>-<%= pkg.version %>.min.js': ['src/ugal.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint']);
};