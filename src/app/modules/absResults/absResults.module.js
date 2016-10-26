import uiRouter from 'angular-ui-router';
import absResultsComponent from './absResults.component';
import absResultsService from './services/absResults.service';
import adminComponent from '../admin/admin.component';

const absResultsModule = angular
    .module('app.core.absResults', [
        uiRouter
    ])
    .component('absResults', adminComponent)
    .service('absResultsService', absResultsService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.absResults', {
                url: 'results',
                component: 'absResults',
                data: {
                    pageTitle: 'Results'
                }
            });
    })
    .name;

export default absResultsModule;
