import uiRouter from 'angular-ui-router';
import underConstructionComponent from './underConstruction.component';
import underConstructionService from './services/underConstruction.service';

const underConstructionModule = angular
    .module('app.core.underConstruction', [
        uiRouter
    ])
    .component('underConstruction', underConstructionComponent)
    .service('underConstructionService', underConstructionService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.underConstruction', {
                url: '/under-construction',
                params: { navName : '' },
                component: 'underConstruction'
            });
    })
    .name;

export default underConstructionModule;
