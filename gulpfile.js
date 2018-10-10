var gulp = require("gulp");
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var browserSync = require('browser-sync');

gulp.task("copy-html", function () {
    return gulp.src(['src/*.html','src/libs/*'])
        .pipe(gulp.dest('build'));
});

gulp.task("build", ["copy-html"], function () {
    browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest("build"));
});

gulp.task('default',['server'], function() {
    gulp.watch(["src/**/*"], ['build']);
});

gulp.task('server', ['build'], function () {
    browserSync({
        open: true,
        port: 8001,
        files: ["build/**/*.{html,htm,css,js,json}"],
        server: {
            "baseDir": "./build"
        }
    });
});