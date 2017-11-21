import uiRouter from 'angular-ui-router';
import overviewComponent from './overview.component';
import overviewService from './services/overview.service';

const overviewModule = angular
    .module('app.core.overview', [
        uiRouter
    ])
    .component('overview', overviewComponent)
    .service('overviewService', overviewService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.overview', {
                url: '/overview',
                component: 'overview',
                data: {
                    pageTitle: 'Abstract - Home'
                }
            });
    })
    .name;

export default overviewModule;
