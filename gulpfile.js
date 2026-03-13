const {series, parallel, watch, src, dest} = require('gulp');
const pump = require('pump');

// CSS processing
const postcss = require('gulp-postcss');
const easyimport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// JS processing
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Packaging
const zip = require('gulp-zip');

// CSS task
function css(done) {
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss([
            easyimport,
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/', {sourcemaps: '.'}),
    ], done);
}

// JS task
function js(done) {
    pump([
        src([
            'assets/js/lib/*.js',
            'assets/js/*.js'
        ], {sourcemaps: true}),
        concat('app.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
    ], done);
}

// Package theme into zip
function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!yarn-error.log',
            '!yarn.lock',
            '!package-lock.json'
        ]),
        zip(filename),
        dest('dist/')
    ], done);
}

// Development watcher
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsWatcher = () => watch('assets/js/**/*.js', js);
const watcher = parallel(cssWatcher, jsWatcher);

// Build task
const build = parallel(css, js);

// Export tasks
exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, watcher);

