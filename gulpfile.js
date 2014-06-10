var gulp = require('gulp')
var karma = require('gulp-karma')

gulp.task('test', function() {
    return gulp.src([
        'bower_components/angular/angular.js'
        ,'bower_components/angular-ui-router/release/angular-ui-router.js'
        , 'bower_components/angular-mocks/angular-mocks.js'
        ,'index.js'
        ,'test/**'
    ])
        .pipe(karma({
            configFile: 'karma.config.js'
            , action: 'run'
        }))
        .on('error', function(err) {
            throw err
        })
})
