const { src, dest, watch, parallel, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//Imgenes
const imagemin = require('gulp-imagemin');


function css( done ){
    src('src/scss/app.scss') // Encontrar archivo principal
        .pipe( sass() ) // Compilar SASS
        .pipe( dest('build/css') )  // Guardar o exportar en una ubicación

    done();
}

function imagenes( done ){
    src('src/img/**/*', { encoding: false })
        .pipe( imagemin({optimizationLevel: 3}) )
        .pipe( dest('build/img'))
    done();
}

function dev( ){
    watch('src/scss/**/*.scss', css);
}

function devImages(){
    watch('src/img/**/*', imagenes);
}

function cssbuild( done ){
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'));
    done();
}

exports.css = css;
exports.dev = dev;
exports.devImages = devImages;
exports.imagenes = imagenes;
exports.build = series( cssbuild );
exports.default = parallel(dev, devImages)