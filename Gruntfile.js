module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'js/*.js']
    },
    coffee: {
      compile: {
        files: {
          'build/js/ugal.js' : 'js/ugal.coffee'
        }
      }
    },
    watch: {
      files: ['js/*.js'],
      tasks: ['coffee']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint']);

};