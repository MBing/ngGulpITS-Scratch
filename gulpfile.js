var browserSync = require('browser-sync').create(),
    es = require('event-stream'),
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
        .pipe(ngAnnotate())
        //.pipe(angularFilesort())
        //.pipe(jsValidate())
        //.pipe(uglify())
        //.pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('index', ['styles', 'scripts'], function () {
    "use strict";
    // first move target to dist folder to resolve relative links
    var target = gulp.src('./public/app/index.html')
                    .pipe(gulp.dest('./public/dist'));

    var sources = gulp.src(['./public/dist/js/*.js', './public/dist/css/*.css'], {read: false});

    //target.pipe(inject(gulp.src(bowerFiles(), { read: false}), {name: 'bower'}))
    //    target.pipe(inject(es.merge(sources), {relative: true}))
    target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('img', function () {
    "use strict";
    return gulp.src(['./public/app/**/*.png', './public/app/**/*.jpg'])
        .pipe(gulp.dest('./public/dist'));
});

//gulp.task('fonts', function () {
//    return gulp.src(bowerFiles())
//        .pipe($.filter('**/*.woff'))
//        .pipe($.flatten())
//        .pipe(gulp.dest('dist/fonts'))
//        .pipe($.size());
//});

gulp.task('html', function () {
    "use strict";
    return gulp.src(['./public/app/**/*.html', '!./public/app/bower_components'])
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('assets', function () {
    "use strict";
    return gulp.src('./public/app/assets/**/*')
        .pipe(gulp.dest('./public/dist/assets'));
})

gulp.task('bower', function () {
    "use strict";
    return gulp.src(bowerFiles(), { base: './public/app/bower_components' })
        .pipe(gulp.dest('./public/dist/bower_components'));
});

gulp.task('default', ['index']);

gulp.task('watch', ['index', 'styles', 'scripts', 'html', 'img', 'assets'], function () {
    "use strict";
    gulp.watch('./public/assets/**/*', ['assets']).on('change', browserSync.reload);
    gulp.watch('./public/app/**/*.html', ['html']).on('change', browserSync.reload);
    gulp.watch('./public/app/styles/**/*', ['styles']).on('change', browserSync.reload);
    gulp.watch('./public/app/app.js', ['scripts']).on('change', browserSync.reload);
    gulp.watch('./public/app/js/**/*', ['scripts']).on('change', browserSync.reload);
    gulp.watch('./public/app/imgs/**/*', ['img']).on('change', browserSync.reload);
    gulp.watch('./bower.json', ['index']).on('change', browserSync.reload);
});

gulp.task('serve', ['watch'], function () {
    "use strict";
    browserSync.init({
        server: {
            baseDir: "./public/dist"
        }
    });
})