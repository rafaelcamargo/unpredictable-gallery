module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'example/js/*.js']
    },
    uglify: {
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