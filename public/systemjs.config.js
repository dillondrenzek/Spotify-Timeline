// (function(global) {
//
//   // map tells the System loader where to look for things
//   var map = {
//     'app':                        'public/app', // 'dist',
//     'rxjs':                       'node_modules/rxjs',
//     'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
//     '@angular':                   'node_modules/@angular'
//   };
//
//   // packages tells the System loader how to load when no filename and/or no extension
//   var packages = {
//     'app':                        { main: 'boot.js',  defaultExtension: 'js' },
//     'rxjs':                       { defaultExtension: 'js' },
//     'angular2-in-memory-web-api': { defaultExtension: 'js' },
//   };
//
//   var packageNames = [
//     '@angular/common',
//     '@angular/compiler',
//     '@angular/core',
//     '@angular/http',
//     '@angular/platform-browser',
//     '@angular/platform-browser-dynamic',
//     '@angular/router',
//     '@angular/router-deprecated',
//     '@angular/testing',
//     '@angular/upgrade',
//   ];
//
//   // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
//   packageNames.forEach(function(pkgName) {
//     packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
//   });
//
//   var config = {
//     map: map,
//     packages: packages
//   }
//
//   // filterSystemConfig - index.html's chance to modify config before we register it.
//   if (global.filterSystemConfig) { global.filterSystemConfig(config); }
//
//   System.config(config);
//
// })(this);

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'public/app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './boot.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
