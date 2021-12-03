/*jshint esversion: 6 */
// gulpなど
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');

// ass
const compass = require('gulp-compass');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

// css関連
const postcss = require('gulp-postcss');
const customproperties = require('postcss-custom-properties');
const nested = require('postcss-nested');
const cssimport = require('postcss-import');
const mmq = require('gulp-merge-media-queries');

// アイコンフォント
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const runTimestamp = Math.round(Date.now() / 1000);
const fontName = 'myfont'; // アイコンフォント名

// svgSprite
const path = require('path');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');

// image min関連
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const gifsicle = require('imagemin-gifsicle');
const svgo = require('imagemin-svgo');

// spriteData
const spritesmith = require('gulp.spritesmith');

// Webp書き出し
const webp = require('gulp-webp');

// js 関連
// const uglifyes = require('uglify-es')
// const composer = require('gulp-uglify/composer')
// const uglify = composer(uglifyes, console)
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
// const uglify = require('gulp-uglify-es')

// ejs関連
const concat = require('gulp-concat');
const ejs = require('gulp-ejs');

// ディレクトリ設定
const dir = {
  src: 'src',
  dist: 'htdocs'
// wp: 'wpMamp',
// theme: 'wpMamp/wp-content/themes/shiftalk'
};

// ejs出力 HTML
function taskejs (done) {
  return gulp.src([dir.src + '{,**/,**/**/,**/**/**/}*.ejs', '!' + dir.src + '{,**/,**/**/,**/**/**/}_*.ejs', '!' + dir.src + '{,**/,**/**/,**/**/**/}*_php.ejs'], {
    base: dir.src
  })
    .pipe(plumber(function (error) {
      console.log(error);
      return this.emit('end');
    }))
    .pipe(ejs())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulp.dest(dir.dist + '/'));
  done();
}
exports.taskejs = taskejs;

// ejs出力 PHP
function taskejsphp (done) {
  return gulp.src([dir.src + '{,**/,**/**/,**/**/**/}*_php.ejs'], {
    base: dir.src
  })
    .pipe(plumber(function (error) {
      console.log(error);
      return this.emit('end');
    }))
    .pipe(ejs())
    .pipe(rename(function (path) {
      return {
        dirname: path.dirname,
        basename: path.basename.replace('_php' , ''),
        extname: '.php'
      };
    }))
    .pipe(gulp.dest(dir.dist + '/'));
  done();
}
exports.taskejsphp = taskejsphp;

// browser-sync
function bssync (done) {
  browserSync.init({
    // proxy: 'https://arrenew',
    server: {
      baseDir: dir.dist + '/',
      index: 'index.html'
    },
    // proxy: 'http://shiftalk.local:8888/',
    reloadOnRestart: true
  });
  done();
}

function bsReload (done) {
  browserSync.reload();
  done();
}
exports.bsReload = bsReload;

// ファイル削除
function cleanImgs (done) {
  del([dir.dist + '/{,**/,**/**/,**/**/**/}*.{png,jpeg,jpg,png,gif,svg,webp}']);
  done();
}
exports.cleanImgs = cleanImgs;

function cleanAll (done) {
  del([dir.dist + '/{,**/,**/**/,**/**/**/}{,*}']);
  done();
}
exports.cleanAll = cleanAll;

const test = 'test';

// sass
function sassout (done) {
  const preprocessors = [
    cssimport,
    require('postcss-mixins'),
    nested
  ];

  return gulp.src([dir.src + '{,**/,**/**/,**/**/**/}!(_)*.scss', '!' + dir.src + '/assets/iconfont/templates/myfont.scss'], {
    base: dir.src + '/assets/scss/',
    sourcemaps: true
  })
    .pipe(plumber(function (error) {
      console.log(error);
      return this.emit('end');
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(postcss(preprocessors))
    .pipe(postcss([customproperties]))
    // .pipe(mmq({
    //   log: true
    // }))
    .pipe(postcss([
      require('cssnano')({
        minifyFontValues: {
          removeQuotes: false,
          minifyFontValues: false
        }
      })
    ]))
    .pipe(postcss([
      require('autoprefixer')({
        cascade: false,
        grid: true
      })
    ]))
    .pipe(gulp.dest(dir.dist + '/assets/css/', {
      sourcemaps: '.'
    }));
  done();
}

exports.sassout = sassout;

// svgImg
function svgout (done) {
  return gulp.src([dir.src + '/assets/imgsvg/*.svg'], {
    base: dir.src + '/assets/imgsvg/'
  })
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [
          {
            removeViewBox: false
          }, {
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
      };
    }))
    .pipe(svgstore({ inlineSvg: true }))

    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[class^="st"],[class^="cls"]').removeAttr('class');
        $('[style]:not(svg)').removeAttr('style');
        $('svg').attr('style', 'display:none');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(dir.src + '/assets/images/'));
  done();
}

exports.svgout = svgout;

// sprite
function spriteanime (done) {
  let spriteData = gulp.src(dir.src + '/assets/spriteanime/logo/*.png')
    .pipe(spritesmith({
      imgName: 'sprite-logo.png', // スプライト画像
      cssName: '_sprite-logo.scss', // 生成される CSS テンプレート
      imgPath: '../images/sprite-logo.png', // 生成される CSS テンプレートに記載されるスプライト画像パス
      cssFormat: 'scss', // フォーマット拡張子
      cssVarMap: (sprite) => {
        sprite.name = 'sprite-' + sprite.name; // 生成される CSS テンプレートに変数の一覧を記述
      },
      algorithm: 'left-right',
      algorithmOpts: {
        sort: false
      }
    }));
  spriteData.img
    .pipe(gulp.dest(dir.src + '/assets/images/')); // imgName で指定したスプライト画像の保存先
  return spriteData.css
    .pipe(gulp.dest(dir.src + '/assets/scss/foundations/'));
  done();
}
exports.spriteanime = spriteanime;

function spriteanime2 (done) {
  let spriteData = gulp.src(dir.src + '/assets/spriteanime/about/*.png')
    .pipe(spritesmith({
      imgName: 'sprite-about.png', // スプライト画像
      cssName: '_sprite-about.scss', // 生成される CSS テンプレート
      imgPath: '../images/sprite-about.png', // 生成される CSS テンプレートに記載されるスプライト画像パス
      cssFormat: 'scss', // フォーマット拡張子
      cssVarMap: (sprite) => {
        sprite.name = 'sprite-' + sprite.name; // 生成される CSS テンプレートに変数の一覧を記述
      },
      algorithm: 'left-right',
      algorithmOpts: {
        sort: false
      }
    }));
  spriteData.img
    .pipe(gulp.dest(dir.src + '/assets/images/')); // imgName で指定したスプライト画像の保存先
  return spriteData.css
    .pipe(gulp.dest(dir.src + '/assets/scss/foundations/'));

  done();
}
exports.spriteanime2 = spriteanime2;

// アイコンフォント作成タスク
function fontout (done) {
  return gulp.src([dir.src + '/assets/iconfont/svg/*.svg'], {
    base: dir.src + '/assets/iconfont/'
  })
    .pipe(iconfont({
      fontName: fontName, // required
      timestamp: runTimestamp,
      formats: ['ttf', 'eot', 'woff', 'svg']
    }))
    .on('glyphs', function (glyphs, options) {
      engine = 'lodash',
      consolidateOptions = {
        glyphs: glyphs,
        fontName: fontName,
        fontPath: '../fonts/', // cssからのフォントパスを指定 ※cssからの相対パスでフォントを指定してもOK
        className: 'myfont', // cssのフォントのクラス名を指定
      };
      // アイコンフォント用のscssを作成(実装用)
      gulp.src(dir.src + '/assets/iconfont/templates/myfont.scss')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: '_' + fontName }))
        .pipe(gulp.dest(dir.src + '/assets/scss/foundations/')); // scssの吐き出し先を指定
      // アイコンフォント用のcssを作成(プレビュー用)
      gulp.src(dir.src + '/assets/iconfont/templates/myfont.css')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: fontName }))
        .pipe(gulp.dest(dir.src + '/iconfont/')); // scssの吐き出し先を指定
      // アイコンフォント一覧のサンプルHTMLを作成(プレビュー用)
      gulp.src(dir.src + '/assets/iconfont/templates/myfont.html')
        .pipe(consolidate(engine, consolidateOptions))
        .pipe(rename({ basename: 'sample' }))
        .pipe(gulp.dest(dir.src + '/iconfont/')); // サンプルhtmlの吐き出し先を指定
    })
    .pipe(gulp.dest(dir.src + '/assets/fonts/'));

  done();
}

exports.fontout = fontout;

// CSS出力
function cssout (done) {
  const preprocessors = [
    cssimport,
    require('postcss-mixins'),
    nested
  ];

  return gulp.src([dir.src + '{,**/,**/**/,**/**/**/}!(_)*.css'], {
    base: dir.src,
    sourcemaps: true
  })
    .pipe(plumber(function (error) {
      console.log(error);
      return this.emit('end');
    }))
    .pipe(postcss(preprocessors))
    .pipe(postcss([customproperties]))
    // .pipe(mmq({
    //   log: true
    // }))
    .pipe(postcss([
      require('cssnano')({
        minifyFontValues: {
          removeQuotes: false,
          minifyFontValues: false
        }
      })
    ]))
    .pipe(postcss([
      require('autoprefixer')({
        cascade: false,
        grid: true
      })
    ]))
    .pipe(gulp.dest(dir.dist + '/', {
      sourcemaps: '.'
    }));
  done();
}

exports.cssout = cssout;

// 画像圧縮
function taskImagemin (done) {
  return gulp.src([dir.src + '/{,**/,**/**/,**/**/**/}*.{png,jpeg,jpg,gif,svg}', '!' + dir.src + '/assets/iconfont/{,**/,**/**/,**/**/**/}*.*' /*, '!' + dir.src + '/assets/images/imgsvg.svg'*/, '!' + dir.src + '/assets/imgsvg/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/assets/spriteanime/{,**/,**/**/,**/**/**/}*.*'], {
    base: dir.src
  })
    .pipe(changed(dir.dist))
    .pipe(imagemin([
      pngquant({
        quality: [0.6, 0.85],
        speed: 1,
        floyd: 0
      }),
      imagemin.mozjpeg({
        quality: 85,
        progressive: true
      }),
      /*imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }
      ),*/
      imagemin.gifsicle()
    ]))
    .pipe(gulp.dest(dir.dist));
  done();
}

exports.imgmin = taskImagemin;

// webP変換
function taskWebp (done) {
  return gulp.src([dir.src + '/{,**/,**/**/,**/**/**/}*.{png,jpeg,jpg,gif}', '!' + dir.src + '/assets/favicons/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/iconfont/{,**/,**/**/,**/**/**/}*.*' /*, '!' + dir.src + '/images/imgsvg.svg'*/, '!' + dir.src + '/imgsvg/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/assets/spriteanime/**/*.*', '!' + dir.src + '/assets/images/sprite-*.png'], {
    base: dir.src
  })
    // .pipe(changed(dir.dist))
    .pipe(webp())
    .pipe(gulp.dest(dir.dist));
  done();
}

exports.webp = taskWebp;

// 複製
function copyOtherFiles (done) {
  return gulp.src([dir.src + '/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/{,**/,**/**/,**/**/**/}{*.scss,*.css,*.js,*.ejs,*.png,*.jpeg,*.jpg,*.gif,*.svg}', dir.src + '/{,**/,**/**/,**/**/**/}.htaccess', '!' + dir.src + '/iconfont/*.*', '!' + dir.src + '/assets/iconfont/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/assets/imgsvg/*.*', '!' + dir.src + '/assets/spriteanime/**/*.*'], {
    base: dir.src
  })
    .pipe(changed(dir.dist))
    .pipe(gulp.dest(dir.dist));
  done();
}

exports.taskcopy = copyOtherFiles;

function jsbabel (done) {
  return gulp.src([dir.src + '/assets/js/babel/{,**/,**/**/,**/**/**/}*.js'], {
    // base: dir.src
  })
    .pipe(babel({
      'presets': ['@babel/preset-env']
    }))
    .pipe(gulp.dest(dir.src + '/assets/js/', {
    }));
  done();
}
exports.jsbabel = jsbabel;

function jsmin (done) {
  return gulp.src([dir.src + '/assets/js/*.js'], {
    base: dir.src,
    sourcemaps: true
  })
    .pipe(changed(dir.dist))
    .pipe(uglify())
    .pipe(concat('master.js'))
    .pipe(gulp.dest(dir.dist + '/assets/js/', {
      sourcemaps: '.'
    }));
  done();
}
exports.jsmin = jsmin;

// watch
gulp.task('watch', function (done) {
  gulp.watch([dir.src + '/assets/imgsvg/*.svg'], gulp.series('svgout', 'bsReload'));
  gulp.watch([dir.src + '/assets/iconfont/svg/*.svg'], gulp.series('fontout', 'bsReload'));
  gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}*.scss'], gulp.series('sassout', 'bsReload'));
  // gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}*.css'], gulp.series('cssout', 'bsReload'))
  gulp.watch([dir.src + '/assets/spriteanime/**/*.png'], gulp.series('spriteanime', 'bsReload'));
  gulp.watch([dir.src + '/assets/spriteanime/**/*.png'], gulp.series('spriteanime2', 'bsReload'));
  gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}images/*.{png,jpeg,jpg,gif,svg}', dir.src + '/{,**/,**/**/,**/**/**/}images/{,**/,**/**/,**/**/**/}*.{png,jpeg,jpg,gif,svg}'], gulp.series('imgmin', 'webp', 'bsReload'));
  gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}*.ejs'], gulp.series('taskejs', 'bsReload'));
  gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}*_php.ejs'], gulp.series('taskejsphp', 'bsReload'));
  // gulp.watch([dir.wp + '/{,**/,**/**/,**/**/**/}*.php'], gulp.series('bsReload'))
  gulp.watch([dir.src + '/assets/js/babel/*.js'], gulp.series('jsbabel', 'bsReload'));
  gulp.watch([dir.src + '/assets/js/*.js'], gulp.series('jsmin', 'bsReload'));
  gulp.watch([dir.src + '/{,**/,**/**/,**/**/**/}*.*', '!' + dir.src + '/{,**/,**/**/,**/**/**/}{*.css,*.js,*.ejs,*.png,*.jpeg,*.jpg,*.gif,*.svg}', dir.src + '/{,**/,**/**/,**/**/**/}.htaccess'], gulp.series('taskcopy', 'bsReload'));

  done();
});

// 初期
gulp.task('default', gulp.parallel(bssync, 'watch'), function (done) {
  done();
});

// ソースから全ファイル出力
gulp.task('destAll', gulp.series(cleanAll, gulp.parallel(jsbabel, jsmin, taskejs, sassout, fontout, svgout, spriteanime, spriteanime2, taskImagemin, taskWebp), taskejsphp, gulp.series(copyOtherFiles)), function (done) {
  done();
});
