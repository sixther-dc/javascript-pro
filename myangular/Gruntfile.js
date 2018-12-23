module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['src/**/*.js'],
            options : {
                globals: {
                    _: false,
                    $: false,
                    jasmine: false,
                    descsribe: false,
                    it: false,
                    expect: false,
                    beforeEach: false,
                    afterEach: false,
                    sinon: false
                },
                //声明代码可以在浏览器环境下执行，可以执行console等函数
                browser: true,
                devel: true
            }
        },
        testem: {
            unit: {
                options: {
                    framework: 'jasmine2',
                    //在特定浏览器中执行测试,phantomjs是一个隐形浏览器
                    launch_in_dev: ['Chrome'],
                    before_tests: 'grunt jshint',
                    serve_files: [
                        'node_modules/lodash/lodash.js',
                        'node_modules/sinon/pkg/sinon.js',
                        'node_modules/jquery/dist/jquery.js',
                        'src/**/*.js',
                        'test/**/*.js'
                    ],
                    watch_files: [
                        'src/**/*.js',
                        'test/**/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-testem');

    grunt.registerTask('default', ['jshint','testem'])
};
