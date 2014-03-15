module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compileJoined: {
        options: {
          join: true,
          bare: true
        },
        files: {
          'js/app.js': ['coffeescript/*.coffee']
        }
      }
    },
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: ['js/libs/jquery-1.10.2.js', 'js/libs/jquery.csv-0.71.js', 'js/libs/handlebars-1.1.2.js', 'js/libs/ember-1.4.0.js', 'js/libs/ember-data.js', 'js/libs/md5.js', 'js/libs/underscore.js', 'js/app.js'],
        dest: 'js/<%= pkg.name %>.js',
      }
    },
    watch: {
      scripts: {
        files: ['coffeescript/*.coffee', 'css/*.scss'],
        tasks: ['sass', 'coffee', 'concat'],
        options: {
          spawn: false,
        },
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['sass', 'coffee', 'concat', 'uglify']);
};