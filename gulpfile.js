"use strict";

var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var merge = require("merge-stream");
var sequence = require("run-sequence");
var del = require("del");
var nodemon = require("gulp-nodemon");
var scss = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var pug = require("gulp-pug");
var watch = require("gulp-watch");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");

gulp.task("default", function(callback) {
  sequence(
    "clean",
    "pug",
    ["scss", "js", "module"],
    ["browser-sync", "watch"],
    "nodemon",
    callback
  );
});

gulp.task("clean", function() {
  return del(["public/"]);
});

gulp.task("pug", function() {
  return (
    gulp
      .src("./views/*.pug")
      // .pipe(pug({
      //    pretty: true
      // }))
      // //.pipe(pug().on('error', pug.logError))
      // .pipe(gulp.dest('./public/webapp'))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("module", function() {
  // Bootstrap
  var bootstrap = gulp
    .src("./node_modules/bootstrap/dist/**/*")
    .pipe(gulp.dest("./public/vendor/bootstrap"));

  // jQuery
  var jquery = gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./public/vendor/jquery"));

  return merge(bootstrap, jquery);
});

gulp.task("js", function() {
  return gulp
    .src(["src/js/*.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(concat("script.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("public/js"))
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("public/js"));
});

var scssOptions = {
  /** * outputStyle (Type : String , Default : nested)
   * * CSS의 컴파일 결과 코드스타일 지정
   * * Values : nested, expanded, compact, compressed */

  outputStyle: "expanded",

  /** * indentType (>= v3.0.0 , Type : String , Default : space)
   * * 컴파일 된 CSS의 "들여쓰기" 의 타입
   * * Values : space , tab */

  indentType: "tab",

  /** * indentWidth (>= v3.0.0, Type : Integer , Default : 2)
   * * 컴파일 된 CSS의 "들여쓰기" 의 갯수 */

  indentWidth: 1,

  // outputStyle 이 nested, expanded 인 경우에 사용
  /** * precision (Type : Integer , Default : 5)
   * * 컴파일 된 CSS 의 소수점 자리수. */

  precision: 6,

  /** * sourceComments (Type : Boolean , Default : false)
   * * 컴파일 된 CSS 에 원본소스의 위치와 줄수 주석표시. */

  sourceComments: true
};

gulp.task("scss", function() {
  return (
    gulp
      // SCSS 파일을 읽어온다.
      .src("./src/sass/*.scss")
      // 소스맵 초기화(소스맵을 생성)
      .pipe(sourcemaps.init())
      // SCSS 함수에 옵션갑을 설정, SCSS 작성시 watch 가 멈추지 않도록 logError 를 설정
      .pipe(scss(scssOptions).on("error", scss.logError))
      // 위에서 생성한 소스맵을 사용한다.
      .pipe(sourcemaps.write())
      // 목적지(destination)을 설정
      .pipe(gulp.dest("public/css"))
      .pipe(browserSync.reload({ stream: true }))
  );
});

gulp.task("browser-sync", function() {
  browserSync.init(null, {
    proxy: "http://localhost:5000",
    files: ["public/**/*.*"],
    open: false
  });
});

gulp.task("watch", function() {
  gulp.watch("src/js/*.js", ["js"]);
  gulp.watch("src/sass/*.scss", ["scss"]);
  gulp.watch("views/*.pug", ["pug"]);
});

gulp.task("nodemon", function(cb) {
  var started = false;

  return nodemon({
    script: "app.js"
  }).on("start", function() {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
