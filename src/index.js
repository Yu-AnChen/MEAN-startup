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

// configs
import appFilters from './appFilters';

import themeConfig from './themeConfig';
import METADATA from './METADATA';
import 'compass-mixins';

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
        'LocalStorageModule',
        'smart-table',
        appFilters,
        app
    ])
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $urlRouterProvider.otherwise('/');
    })
    .config(themeConfig)
    .constant('METADATA', METADATA);
