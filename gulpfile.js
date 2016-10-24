var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');


var path = {
  src:{
    base: './app',
    js: './app/assets/js/**/*.js',
    sass: './app/assets/sass/*.scss',
    sassAll: './app/assets/sass/**/*.scss',
    css: './app/assets/css/',
    html: './app/*.html',
    pageTemplates: './app/pageTemplates/*.html',
    img: './app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)',
    fonts: './app/assets/fonts/**/*'
  },
  dest:{
    base: './dist',
    pageTemplates: './dist/pageTemplates/',
    css: './dist/assets/css/',
    img: './dist/assets/images/',
    fonts: './dist/assets/fonts/'
  }
}

// /*
// ██████  ███████ ██    ██     ████████  █████  ███████ ██   ██
// ██   ██ ██      ██    ██        ██    ██   ██ ██      ██  ██
// ██   ██ █████   ██    ██        ██    ███████ ███████ █████
// ██   ██ ██       ██  ██         ██    ██   ██      ██ ██  ██
// ██████  ███████   ████          ██    ██   ██ ███████ ██   ██
// */

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: path.src.base
    }
  })
})

// libsuss option - outputStyle: Default: nested Values: nested, expanded, compact, compressed
gulp.task('sass', function() {
  gulp.src(path.src.sass)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        // browsers: ['last 2 versions', '> 1%'],
        browsers: ['defaults', 'ios >= 8', 'Safari >= 8'],
        cascade: false
    }))
    .pipe(gulp.dest(path.src.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script', function() {
  gulp.src(path.src.js)
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// /*
// ██     ██  █████  ████████  ██████ ██   ██
// ██     ██ ██   ██    ██    ██      ██   ██
// ██  █  ██ ███████    ██    ██      ███████
// ██ ███ ██ ██   ██    ██    ██      ██   ██
//  ███ ███  ██   ██    ██     ██████ ██   ██
// */

gulp.task('watch', ['browserSync', 'sass', 'script'], function(){
  gulp.watch(path.src.sassAll, ['sass']);
  gulp.watch(path.src.html, browserSync.reload);
  gulp.watch(path.src.js, ['script']);
})

// /*
//  ██████  ██████  ████████ ██ ███    ███ ██ ███████ ███████
// ██    ██ ██   ██    ██    ██ ████  ████ ██    ███  ██
// ██    ██ ██████     ██    ██ ██ ████ ██ ██   ███   █████
// ██    ██ ██         ██    ██ ██  ██  ██ ██  ███    ██
//  ██████  ██         ██    ██ ██      ██ ██ ███████ ███████
// */

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src(path.src.html)
    .pipe(useref())
    .pipe(gulp.dest(path.dest.base));
});

gulp.task('userefprod', function() {

  return gulp.src(path.src.html)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(path.dest.base));
});

/*
gulp.task('copyPageTemplates', function() {

  return gulp.src(path.src.pageTemplates)
    .pipe(gulp.dest(path.dest.pageTemplates));
});
*/


// /*
//  ██████  ██████  ████████ ██ ███    ███ ██ ███████ ███████
// ██    ██ ██   ██    ██    ██ ████  ████ ██    ███  ██
// ██    ██ ██████     ██    ██ ██ ████ ██ ██   ███   █████
// ██    ██ ██         ██    ██ ██  ██  ██ ██  ███    ██
//  ██████  ██         ██    ██ ██      ██ ██ ███████ ███████

// ██ ███    ███  █████   ██████  ███████ ███████
// ██ ████  ████ ██   ██ ██       ██      ██
// ██ ██ ████ ██ ███████ ██   ███ █████   ███████
// ██ ██  ██  ██ ██   ██ ██    ██ ██           ██
// ██ ██      ██ ██   ██  ██████  ███████ ███████
// */

gulp.task('images', function() {
  return gulp.src(path.src.img)
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest(path.dest.img))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dest.fonts))
})

// /*
//  ██████ ██      ███████  █████  ███    ██
// ██      ██      ██      ██   ██ ████   ██
// ██      ██      █████   ███████ ██ ██  ██
// ██      ██      ██      ██   ██ ██  ██ ██
//  ██████ ███████ ███████ ██   ██ ██   ████
// */

gulp.task('clean', function() {
  return del.sync(path.dest.base).then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync([path.dest.base +'/**/*', '!'+path.dest.base+'/assets/images', '!'+path.dest.base+'/assets/images/**/*']);
});

// /*
// ██████  ██    ██ ██ ██      ██████
// ██   ██ ██    ██ ██ ██      ██   ██
// ██████  ██    ██ ██ ██      ██   ██
// ██   ██ ██    ██ ██ ██      ██   ██
// ██████   ██████  ██ ███████ ██████

// ███████ ███████  ██████  ██    ██ ███████ ███    ██  ██████ ███████
// ██      ██      ██    ██ ██    ██ ██      ████   ██ ██      ██
// ███████ █████   ██    ██ ██    ██ █████   ██ ██  ██ ██      █████
//      ██ ██      ██ ▄▄ ██ ██    ██ ██      ██  ██ ██ ██      ██
// ███████ ███████  ██████   ██████  ███████ ██   ████  ██████ ███████
// */

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback
  )
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    ['useref', 'images', 'fonts'],
    callback
  )
});

// Build for production.
// Minifies all the CSS and JavaScript
gulp.task('build-production', function(callback) {
  runSequence(
    'clean:dist',
    ['userefprod', 'images', 'fonts'],
    callback
  )
});
