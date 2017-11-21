import uiRouter from 'angular-ui-router';
import components from './components';
import modules from './modules';
import services from './services';
import signOutComponent from './modules/user/signOut';

import appComponent from './app.component';

const appModule = angular
    .module('app.core', [
        uiRouter,
        components,
        modules,
        services,
    ])
    .component('app', appComponent)
    .component('signOut',signOutComponent )
    // .config(($urlRouterProvider) => {
    //     'ngInject';
    //     $urlRouterProvider
    //         // .when('/user/signin', '/user/edit');
    //         // .otherwise('/')
    // })
    .config(['$uiRouterProvider', $uiRouter => {
        // 'ngInject';
        $uiRouter.stateRegistry
            .register({
                name: 'app',
                // url: '/',
                redirectTo: 'app.absForm',
                component: 'app',
                // data: {
                //     pageTitle: 'Abstract - Home'
                // }
            });
    }])
    // .config(($stateProvider) => {
    //     'ngInject';
    //     $stateProvider
    //         .state({
    //             name: 'app',
    //             url: '',
    //             redirectTo: 'app.overview',
    //             component: 'app',
    //             data: {
    //                 pageTitle: 'Abstract - Home'
    //             },
    //         })
    //         ;
    // })
    .name;

export default appModule;
