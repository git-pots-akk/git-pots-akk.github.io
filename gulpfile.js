const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;

const {SRC_PATH, DIST_PATH, STYLE_LIBS, JS_LIBS} = require('./gulp.config');

sass.compiler = require('node-sass');


task('clean', () => {
  return src('${DIST_PATH}/**/*', { read: false }).pipe(rm())
})

task('copy:html', () => {
    return src('src/*.html')
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
  });

  task('styles', () => {
    return src([...STYLE_LIBS, 'src/styles/main.scss'])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(env === 'prod', autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({ stream: true }));
  });

task('icons', () => {
  return src('src/img/icons/*.svg')
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: {
            attrs: '(width|height|data.*)'
          }
        }
      ]
    }))
    .pipe(dest('dist/img/icons'));
  });

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      
      open: false
  });
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/img/icons/*.svg', series('icons'));
 });

task(
  'default',
  series(
    'clean',
    parallel('copy:html', 'styles', 'icons'),
    parallel('watch', 'server')
  )
);

task(
  'build',
  series(
    'clean',
    parallel('copy:html', 'styles', 'icons')
  )
);