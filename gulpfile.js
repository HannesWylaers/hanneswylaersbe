/* 
 * REQUIRE all the added packages
------------------------------------------------------*/
//'require' is to tell Node to look into node_modules
var gulp = require('gulp'); //for a package named 'gulp'
    sass = require('gulp-sass');//Requires the gulp-sass plugin
    sassGlob = require('gulp-sass-glob');//Requires sass-globing for the styles.scss file
    browserSync = require('browser-sync').create();//Requires Browser Sync
    useref = require('gulp-useref');//Requires gulp-useref for concatinating several js files to 1 file
    cssnano = require('gulp-cssnano');
    uglify = require('gulp-uglify');
    gulpIf = require('gulp-if');
    sourcemaps = require('gulp-sourcemaps'); //used for minifying the css + show where the css is in the scss files
    autoprefixer = require('gulp-autoprefixer'); //for autoprefixing the css


/* 
 * TASK for compilling the scss files to css files
------------------------------------------------------*/
gulp.task('sass', function(){
   return gulp
    
    .src('scss/styles.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sassGlob())
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'Safari >= 5', 'ie 8-9', '> 1%']
    }))
    .pipe(sourcemaps.write()) // Writing sourcemaps
    .pipe(sass().on('error', sass.logError))// Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('css')) //desitnation for the compilled sass files
    .pipe(browserSync.reload({
      stream: true
    }))
});


/* 
 * TASK for watching the scss  folder
------------------------------------------------------*/
gulp.task('watch', ['browserSync', 'sass'], function(){ //watch is an array of tasks to complete
  gulp.watch('scss/**/*.scss', ['sass']); 
})


/* 
 * TASK for browser sync injected in the watch task
------------------------------------------------------*/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: ''
    },
  })
})

/* 
 * TASK for concatinating CSS and JS files
------------------------------------------------------*/
gulp.task('useref', function(){
  return gulp.src('*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});


/* 
 * TASK for concatinating CSS and JS files
------------------------------------------------------*/
gulp.task('minify', function() {
  return gulp.src('/css/style.css')
      .pipe(cssnano())
      .pipe(gulp.dest('/css/style.css'));
});
