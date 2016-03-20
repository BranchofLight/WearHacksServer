module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        seperator: ',',
      },
      dist: {
        src: ['server.js', 'parkDB.js'],
        dest: 'main.js'
      },
    },
    watch: {
      files: ['server.js', 'parkDB.js', 'main.js'],
      tasks: ['concat', 'lint'],
    },
    jshint: {
      src: ['Gruntfile.js', 'server.js', 'parkDB.js'],
    },
  });

  // Load the plugin that provides the "watch" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('default', ['lint']);
  // Non-default task(s)
  grunt.registerTask('wat', ['watch']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('cat', ['concat']);
};
