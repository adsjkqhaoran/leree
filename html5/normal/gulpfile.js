var gulp = require('gulp');
// sass 插件
var sass = require('gulp-sass');
// 自动同步浏览器插件
var browserSync = require('browser-sync');
// 合并文件的插件
var useref = require('gulp-useref');
// 压缩js插件
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
// 压缩css插件
var cssnano = require('gulp-cssnano');
// 压缩图片插件
var imagemin = require('gulp-imagemin');
// 压缩png图片的插件
var pngquant = require('imagemin-pngquant');
// 缓存插件，可以加快编译速度
var cache = require('gulp-cache');
// 删除文件插件
var del = require('del');
// 同步运行任务插件
var runSequence = require('run-sequence');
// 给css3属性添加浏览器前缀插件
var autoprefixer = require('gulp-autoprefixer');
// sourcemap 插件
var sourcemaps = require('gulp-sourcemaps');
var lazypipe = require('lazypipe');
// 合成sprite图片插件
var spritesmith = require('gulp.spritesmith');
var imageminOptipng = require('imagemin-optipng');
// 转base64
var base64 = require('gulp-base64');
// 合并流任务
var mergeStream = require("merge-stream");
//字符替换
var replace = require("gulp-replace");
//重命名
var rename = require('gulp-rename');
//报错处理
var notify = require('gulp-notify');
//html压缩
var htmlmin = require('gulp-htmlmin');
//同步合并多任务
require('gulp-awaitable-tasks')(gulp);

gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./dist/**/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
var handleErrors = function(){
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'compile error',
        message: '<%=error.message %>'
    }).apply(this, args);//替换为当前对象
    this.emit();//提交
}

var isTest = false; // 是否为测试


// 编译sass文件，添加css3属性浏览器前缀，reload 浏览器
gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.+(scss|css)')
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(autoprefixer({
            browsers: ['last 5 versions', 'Android >= 2.3', '>5%'],
            cascade: true
        }))
        .pipe(base64({
            baseDir: '',
            extensions: ['svg', 'png', 'jpg'],
            exclude: ['sprite.png'],
            maxImageSize: 3 * 1024, // bytes
            debug: true
        }))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({stream: true}));
});
// 自动更新浏览器任务
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
});
//打包
gulp.task('bundle', function () {
    var taskStreams = mergeStream();
    taskStreams.add(gulp.src('src/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css')));
    taskStreams.add(gulp.src(['src/js/**/*.js','!src/js/**/app_tools.js'])
        .pipe(uglify({}))
        .pipe(gulp.dest('dist/js')));
    taskStreams.add(gulp.src(['src/js/**/app_tools.js'])
        .pipe(replace("//___forceTest___",isTest?"appTools.isTest = true;":""))
        .pipe(uglify({}))
        .pipe(gulp.dest('dist/js')));
    taskStreams.add(gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist')));
    taskStreams.add(gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
        .pipe(gulp.dest('dist/images')));
    return taskStreams;
})
// 合并文件任务
// 在html设置需要合并的文件：
//  <!--build:js js/flexible.min.js -->
//      <script src="js/flexible_css.js"></script>
//      <script src="js/flexible.js"></script>
//  <!-- endbuild-->
// 执行任务后，会编译成 ： <script src="js/flexible.min.js"></script>
// 同时会把 flexible_css.js 和 flexible.js 合并成 flexible.min.js
gulp.task('useref', function *() {
    yield gulp.src('./src/*.html')
        .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
        .pipe(gulpIf('*.js',replace("//___forceTest___",isTest?"appTools.isTest = true;":"")))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulpIf('*.js',uglify()))
        .pipe(gulp.dest('dist'));
    yield  del('src/js/bundle');
    yield gulp.src('./dist/js/bundle/**/*js')
        .pipe(gulp.dest('src/js/bundle'));
});

// 图片压缩任务
gulp.task('zipimages', function *() {
    yield del('src/images');
    yield gulp.src('./src/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('src/images'));
});
// 合并sprite图任务
gulp.task('sprite', function () {
    var spriteData = gulp.src('./src/img/sprite/**/*.png')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.scss',
            imgPath: '../../img/sprite/sprite.png',
            cssFormat: 'scss',
            padding: 10
        }));
    return spriteData.pipe(gulp.dest('./src/img/sprite'))
});

// 删除build目录
gulp.task('clean:dist', function () {
    return del.sync('dist');
});
// 清除缓存
gulp.task('cache:clear', function (cb) {
    return cache.clearAll(cb)
});
// 监控任务，当有sass文件，html文件，js文件改动的时候，刷新浏览器
gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/**/*.html', browserSync.reload);
    gulp.watch('./src/js/**/*.js', browserSync.reload);
});
// 构建最终输出文件
gulp.task('build', function (callback) {
    runSequence('clean:dist',['sass', 'bundle'],'useref', callback);
});
// gulp 默认执行任务
gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'], callback);
});

