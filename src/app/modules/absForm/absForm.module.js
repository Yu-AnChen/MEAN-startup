import uiRouter from 'angular-ui-router';
import absFormComponent from './absForm.component';
import absFormService from './services/absForm.service';
import absPrintComponent from './absPrint';

const absFormModule = angular
    .module('app.core.absForm', [
        uiRouter
    ])
    .component('absForm', absFormComponent)
    .component('absPrint', absPrintComponent)
    .service('absFormService', absFormService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.absForm', {
                url: 'absForm',
                component: 'absForm'
            });
    })
    .name;

export default absFormModule;
