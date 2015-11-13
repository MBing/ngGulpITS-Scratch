var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-minify-css'),
    clean = require('gulp-rimraf'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    jsValidate = require('gulp-jsvalidate');

gulp.task('clean-dist', function () {
    "use strict";
    return gulp.src('./public/dist/*', { read: false}).pipe(clean());
});
gulp.task('clean-tmp', function () {
    "use strict";
    return gulp.src('.tmp/*', { read: false}).pipe(clean());
});

gulp.task('styles', function() {
    return gulp.src('./public/app/styles/app.styl')
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
    return gulp.src('./public/app/app.js')
        .pipe(jsValidate())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

gulp.task('index', ['styles', 'scripts'], function () {
    // first move target to dist folder to resolve relative links
    var target = gulp.src('./public/app/index.html')
                    .pipe(gulp.dest('./public/dist'));
    var sources = gulp.src(['./public/dist/**/*.js', './public/dist/**/*.css'], {read: false});

    // {starttag: '<!-- inject:head:{{ext}} -->'}
    target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('default', ['index']);

//var gulp          = require('gulp'),                         // the main guy
//    clone         = require('gulp-clone'),                   // used to fork a stream
//    order         = require('gulp-order'),                   // reorder files in stream
//    uglify        = require('gulp-uglify'),                  // minify js
//    rename        = require('gulp-rename'),                  // rename file
//    concat        = require('gulp-concat'),                  // merge files together
//    stylus        = require('gulp-stylus'),                  // turn stylus into css
//    addsrc        = require('gulp-add-src'),                 // mid-stream gulp.src()
//    notify        = require('gulp-notify'),                  // OS-level notifications
//    plumber       = require('gulp-plumber'),                 // handle errors without crashing
//    annotate      = require('gulp-ng-annotate'),             // safely minify angular
//    beautify      = require('gulp-cssbeautify'),             // make files human readable
//    minifycss     = require('gulp-minify-css'),              // minify css code
//    sourcemap     = require('gulp-sourcemaps'),              // create sourcemaps
//    autoprefix    = require('gulp-autoprefixer'),            // prefix any css with low support
//    templateCache = require('gulp-angular-templatecache'),   // cache angular template files
//    connect       = require('gulp-connect');
//
//var paths = {
//    stylus: {
//        files: ['bower_components/ng-markdown/dist/ng-markdown.css','public/assets/styles/*.styl'],
//        main: 'public/assets/styles/app.styl'
//    },
//    views: ['public/app/**/*.html'],
//    angular: ['public/app/*.js', 'public/app/**/*.js'],
//    libs: [
//        'bower_components/angular/angular.min.js',
//        'bower_components/angular-resource/angular-resource.min.js',
//        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
//        'bower_components/angular-sanitize/angular-sanitize.min.js',
//        'bower_components/lodash/lodash.min.js',
//        'bower_components/ng-markdown/dist/ng-markdown.min.js'
//    ],
//    output: 'public/dist/'
//}
//
//var plumberOpts = {
//    errorHandler: notify.onError("Error: <%= error.message %>")
//}
//
//gulp.task('css', function() {
//
//    // prepare css code
//    var stream = gulp.src(paths.stylus.main)          // grab our stylus file
//        .pipe(plumber(plumberOpts))                   // notify us if any errors appear
//        .pipe(sourcemap.init())                       // get ready to write a sourcemap
//        .pipe(stylus())                               // turn the stylus into css
//        .pipe(sourcemap.write())                      // write the sourcemap
//        .pipe(autoprefix('last 2 versions'))          // autoprefix the css code
//
//    // make style.css
//    stream.pipe(clone())                              // make a copy of the stream up to autoprefix
//        .pipe(beautify())                             // make css really readable
//        .pipe(gulp.dest(paths.output))                // save it into the dist folder
//
//    // make style.min.css
//    stream.pipe(clone())                              // make a copy of the stream up to autoprefix
//        .pipe(minifycss())                            // minify it (removes the sourcemap)
//        .pipe(sourcemap.write())                      // write the sourcemap
//        .pipe(rename('style.min.css'))                // add .min to the filename
//        .pipe(gulp.dest(paths.output))                // save it into the dist folder
//
//    return stream
//
//})
//
//
//
//gulp.task('angular', function() {
//
//    var tplCacheOpts = {
//        module: 'softits'
//    }
//
//    var stream = gulp.src(paths.views)                      // grab all the html views
//        .pipe(plumber())                                    // stop any errors from breaking a watch
//        .pipe(templateCache('templates.js', tplCacheOpts))  // make a template cache from them
//        .pipe(addsrc(paths.angular))                        // add the rest of the angular app
//        .pipe(order(['app.js']))                            // make sure app.js is first
//        .pipe(annotate())                                   // make angular callbacks minifyable
//        .pipe(uglify())                                     // minify the code
//        .pipe(concat('app.min.js'))                         // merge them all into the same file
//        .pipe(gulp.dest(paths.output))                      // save it into the dist folder
//
//    return stream
//
//})
//
//
//
//gulp.task('libs', function() {
//
//    var stream = gulp.src(paths.libs)                       // get all the lib files
//        .pipe(concat('libs.min.js'))                        // merge them together
//        .pipe(uglify())                                     // minify the js
//        .pipe(gulp.dest(paths.output))                      // save it into the dist folder
//
//    return stream
//
//})
//
//
//
//gulp.task('watch', ['angular', 'css'], function() {
//
//    gulp.watch(paths.stylus.files, ['css'])
//    gulp.watch(paths.angular,      ['angular'])
//    gulp.watch(paths.views,        ['angular'])
//
//})
//
//gulp.task('serve', ['watch'], function () {
//    connect.server({
//        root: ['public', 'tmp'],
//        port: 8000,
//        livereload: true
//    });
//});
//
//
//gulp.task('default', ['css', 'angular', 'libs'], function(){
//
//    console.log('Ready to go!')
//
//})