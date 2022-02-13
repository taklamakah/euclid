
let project_folder = "dist";
let source_folder = "#src";

let path={
  build:{
      html: project_folder + "/",
      css: project_folder + "/css/",
      js: project_folder + "/js/",
      img: project_folder + "/img/",
      fonts: project_folder + "/fonts/",
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/css/*.css",
    js: [source_folder + "/js/*.js", "!" + source_folder + "/js/_*.js"],
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/css/**/*.css",
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}"
  },
  clean: "./" + project_folder + "/"
}

let {src,dest, series} = require('gulp'),
  gulp = require('gulp'),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  autoprefixer = require("gulp-autoprefixer"),
  group_media = require("gulp-group-css-media-queries"),
  clean_css = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify-es").default,
  imagemin = require("gulp-imagemin"),
  svgSprite = require("gulp-svg-sprite"),
  gulpif = require("gulp-if"),
  isBuild = process.argv.includes('--build'),
  isDev = !process.argv.includes('--build'),
  sourcemaps = require("gulp-sourcemaps"),
  ttf2woff = require("gulp-ttf2woff"),
  ttf2woff2 = require("gulp-ttf2woff2");


function browserSync (params) {
  browsersync.init({
    server:{
        baseDir: "./" + project_folder + "/"
    },
    port:3000,
    notify:false
  })
}

function html() {
  return src (path.src.html)
  .pipe(fileinclude())
  .pipe(dest(path.build.html))
  .pipe(browsersync.stream())
}


function css() {
  return src (path.src.css)
  .pipe(
    gulpif(
      isDev,
      sourcemaps.init()
    )
  )
  .pipe(
    gulpif(
      isBuild,
      group_media()
    )
  )
  // .pipe (
  //   group_media()
  // )
  // .pipe(
  //   autoprefixer({
  //     overrideBrowserslist: ["last 5 versions"],
  //     cascade: true
  //   })
  // )
  .pipe(
    gulpif(
      isBuild,
      autoprefixer({
        overrideBrowserslist: ["last 5 versions"],
        cascade: true
      })
    )
  )
  .pipe(dest(path.build.css))
  .pipe(clean_css())
  .pipe(
    rename({
      extname: ".min.css"
    })
  )
  .pipe(sourcemaps.write())
  .pipe(dest(path.build.css))
  .pipe(browsersync.stream())
}

function js() {
  return src (path.src.js)
  .pipe(
    gulpif(
      isDev,
      sourcemaps.init()
    )
  )
  .pipe(fileinclude())
  .pipe(dest(path.build.js))
  .pipe(
    gulpif(
      isBuild,
      uglify()
    )
  )
  // .pipe(
  //   uglify()
  // )
  .pipe(
    rename({
      extname: ".min.js"
    })
  )
  .pipe(sourcemaps.write())
  .pipe(dest(path.build.js))
  .pipe(browsersync.stream())
}

function images() {
  return src (path.src.img)
  .pipe(
    gulpif(
      isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false}],
          interlaced: true,
          optimizationlevel: 3 // 0 to 7
        })
      )
  )
  .pipe(dest(path.build.img))
  .pipe(browsersync.stream())
}

function fonts(params) {
  src(path.src.fonts)
  .pipe(ttf2woff())
  .pipe(dest(path.build.fonts));
  return src(path.src.fonts)
  .pipe(ttf2woff2())
  .pipe(dest(path.build.fonts));
}

gulp.task('svgSprite', function(){
  return gulp.src([source_folder + '/iconsprite/*.svg'])
  .pipe(svgSprite({
    mode: {
      stack: {
        sprite: "../icons/icons.svg",
        example: true
      }
    },
  }
  ))
  .pipe(dest(path.build.img))
})

function watchFiles (params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], images);
}

function clean(params) {
  return del(path.clean);
}

let dev = gulp.series(clean, gulp.parallel(css, html, js, images));
let build = gulp.series(clean, gulp.parallel(css, html, js, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.dev = dev;
exports.build = build;
exports.watch = watch;
exports.default = watch;