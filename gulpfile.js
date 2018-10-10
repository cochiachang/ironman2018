var gulp = require('gulp');
const del = require("del");
var ts = require('gulp-typescript');
var runSequence = require("run-sequence");
const browserSync = require('browser-sync');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

gulp.task('build',  function() {
    gulp.src(["src/**/*", "!**/*.ts"]).pipe(gulp.dest("build"));
    var tsResult = gulp.src("src/**/*.ts").pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('build'));
});

gulp.task('libs', () => {
    return gulp
        .src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery/dist/jquery.min.map',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system-polyfills.js.map',
            'node_modules/systemjs/dist/system.js',
            'node_modules/systemjs/dist/system.js.map',
            'node_modules/pixi.js/dist/pixi.min.js',
            'node_modules/pixi.js/dist/pixi.min.js.map'
        ])
        .pipe(gulp.dest("build/lib"));
});

gulp.task('watch-web', () => {
    gulp.watch(["src/**/*"], ['build']);
})

gulp.task("build-web", function () {
    runSequence(
        'watch-web',
        'clean',
        ['build', 'libs'],
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('success');
            }
        }
    );
});

gulp.task('launch-web', ['build-web'], function () {
    browserSync({
        open: true,
        port: 8001,
        files: ["./build/**/*.{html,htm,css,js,json}"],
        server: {
            "baseDir": "./build"
        }
    });
});