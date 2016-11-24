(function (global) {
  /**
   * System configuration for Angular 2 samples
   * Adjust as necessary for your application needs.
   */

  let config = {


    // paths serve as alias
    paths: {
      'npm:':                               '../node_modules/'
    },


    // map tells the System loader where to look for things
    map: {
      'app':                                'public/app',

      '@timeline/core':                     'public/app/core/index.js',
      '@timeline/users':                    'public/app/users/index.js',
      '@timeline/spotify-api':              'public/app/spotify-api/index.js',
      '@timeline/tracks':                   'public/app/tracks/index.js',

      '@angular/core':                      'npm:@angular/core/bundles/core.umd.js',
      '@angular/common':                    'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler':                  'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser':          'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic':  'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http':                      'npm:@angular/http/bundles/http.umd.js',
      '@angular/router':                    'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms':                     'npm:@angular/forms/bundles/forms.umd.js',
      'rxjs':                               'npm:rxjs',
      'angular2-in-memory-web-api':         'npm:angular2-in-memory-web-api',
    },


    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app':                            { main: 'boot.js', defaultExtension: 'js' },
      '@timeline':                      { defaultExtension: 'js' },
      'rxjs':                           { defaultExtension: 'js' },
      'angular2-in-memory-web-api':     { main: 'index.js', defaultExtension: 'js' }
    }

  };

  System.config(config);
})(this);
