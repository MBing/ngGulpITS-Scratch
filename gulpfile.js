var es = require('event-stream'),
    gulp = require('gulp'),
    angularFilesort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    jsValidate = require('gulp-jsvalidate'),
    cssmin = require('gulp-minify-css'),
    ngAnnotate = require('gulp-ng-annotate'),
    clean = require('gulp-rimraf'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    bowerFiles = require('main-bower-files');

gulp.task('clean-dist', function () {
    "use strict";
    return gulp.src('./public/dist/*', { read: false}).pipe(clean());
});
gulp.task('clean-tmp', function () {
    "use strict";
    return gulp.src('.tmp/*', { read: false}).pipe(clean());
});

gulp.task('styles', function() {
    "use strict";
    return gulp.src(['./public/app/styles/app.styl'])
        .pipe(stylus({
            'include css': true,
            'compress': true,
            'resolve url': true
        }))
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('scripts', function() {
    "use strict";
    return gulp.src(['./public/app/**/*.js'])
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
        .pipe(jsValidate())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('index', ['styles', 'scripts'], function () {
    "use strict";
    // first move target to dist folder to resolve relative links
    var target = gulp.src('./public/app/index.html')
                    .pipe(gulp.dest('./public/dist'));

    var sources = gulp.src(['./public/dist/js/*.js', './public/dist/css/*.css'], {read: false});

    target.pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
        .pipe(inject(es.merge(sources), {relative: true}))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['index']);
