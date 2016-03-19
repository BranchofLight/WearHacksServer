module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['server.js'],
      tasks: ['lint'],
    },
    jshint: {
      src: ['Gruntfile.js', 'server.js'],
    },
  });

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['lint']);
  // Non-default task(s)
  grunt.registerTask('wat', ['watch']);
  grunt.registerTask('lint', ['jshint']);
};
