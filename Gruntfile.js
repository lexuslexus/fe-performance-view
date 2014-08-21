/**
 * 自动化脚本定义
 * @noinspection
 */
//
module.exports = function (grunt) {
  'use strict';

  //别名
  grunt.registerTask('default', ['server:local']);
  grunt.registerTask('dev', ['clean', 'copy', 'connect', 'watch']);
  // 读取npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('connect-livereload'); 
  grunt.loadNpmTasks('grunt-open');

  //读取配置
  var pkg = grunt.file.readJSON('package.json');

  var cfg = {
    host: '127.0.0.1',
    port: 9001,
    livereload: 35729
  };

  //grunt config
  grunt.initConfig({
    options : {
      force : true
    },
    //清除目录
    clean: {
      dist: ['dist/']
    },
    
    //复制图片
    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'src', src: '**', dest: 'dist/'},
          {expand: true, cwd: 'css', src: '**', dest: 'dist/css/'},
          {expand: true, cwd: 'lib/jquery/dist/', src: 'jquery.min.js', dest: 'dist/js/'},
          {expand: true, cwd: 'lib/seajs/', src: 'sea.js', dest: 'dist/js/'}
        ]
      }
    },

    //开启Web服务
    connect: {
      options : {
        livereload : cfg.livereload,
        // middleware: function(connect, options, middlewares) { 
        //   return [ 
        //     require('connect-livereload')({port: cfg.livereload}),
        //     connect.query(),
        //     connect.static(options.base),
        //     connect.directory(options.base),
        //   ];
        // }
      },
      dev: {
        options: {
          port: cfg.port,
          base: 'dist',
          open : {
            target : cfg.host + ':' + cfg.port + '/index.html' ,
            appName : 'chrome',
            callback : function () {}
          }
        }
      }
    },

    open : {
      dev : {
        path : cfg.host + ':' + cfg.port + '/index.html' ,
        app : 'chrome'
      }
    },

    watch: {
      css: {
        files: 'src/**',
        tasks: ['copy'],
        options: {
          livereload: cfg.livereload
        },
      },
    }

  });


};