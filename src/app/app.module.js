import uiRouter from 'angular-ui-router';
import components from './components';
import modules from './modules';
import services from './services';

import appComponent from './app.component';

const appModule = angular
    .module('app.core', [
        uiRouter,
        components,
        modules,
        services,
    ])
    .component('app', appComponent)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app', {
                url: '/',
                component: 'app'
            })
            ;
    })
    .config(($urlRouterProvider) => {
        'ngInject';
        $urlRouterProvider
            .when('/user/signin', '/user/edit')
            .otherwise('/')
    })
    .name;

export default appModule;
