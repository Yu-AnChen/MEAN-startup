// cores
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import 'angular-material/angular-material.css';
import 'angular-local-storage';
import 'angular-smart-table';
import ngMdIcons from 'angular-material-icons';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngResource from 'angular-resource';
import ngMessages from 'angular-messages';


// filter-testing
import appFilters from './appFilters';
// directive-testing
import appDirectives from './appDirectives';
// factory
import appFactories from './appFactories';
// configs
import themeConfig from './themeConfig';
import METADATA from './METADATA';
import 'compass-mixins';

// styles
import 'angular-material/angular-material.css';

// entry modules
import app from './app';

angular
    .module('app', [
        uiRouter,
        ngAnimate,
        ngAria,
        ngMaterial,
        ngMdIcons,
        ngSanitize,
        ngResource,
        ngMessages,
        'LocalStorageModule',
        'smart-table',
        appFilters,
        appDirectives,
        appFactories,
        app
    ])
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $urlRouterProvider.otherwise('/');
    })
    .config(themeConfig)
    .constant('METADATA', METADATA);
