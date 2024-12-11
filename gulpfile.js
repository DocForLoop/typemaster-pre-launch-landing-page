const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browsersync = require('browser-sync').create();

//Compile Sass
function scssTask() {
    return src('scss/style.scss', { sourcemaps: true})
        .pipe(sass({
            includePaths: ['./scss'], // Add the root SCSS directory for imports
        }).on('error', sass.logError))
        .pipe(dest('css', {sourcemaps: '.'}));
}

// Serve and reload
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                right: '0',
                left: 'auto',
                backgroundColor: '#444',
                color: '#fff',
                padding: '10px',
                borderRadius: '10px',
                fontSize: '14px',
                textAlign: 'center',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

//Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch('scss/**/*.scss', series(scssTask, browserSyncReload));
}

//Default Task
exports.default = series(scssTask, browserSyncServe, watchTask);