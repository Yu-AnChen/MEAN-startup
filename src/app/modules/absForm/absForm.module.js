import uiRouter from 'angular-ui-router';
import absFormComponent from './absForm.component';
import absFormService from './services/absForm.service';
import absFormServiceLocal from './services/absFormLocal.service';
import absPrintComponent from './absPrint';
import absSubmitCompleteComponent from './absSubmitComplete';
// import signOutComponent from '../user/signOut';

const absFormModule = angular
    .module('app.core.absForm', [
        uiRouter
    ])
    .component('absForm', absFormComponent)
    .component('absPrint', absPrintComponent)
    .component('absSubmitComplete', absSubmitCompleteComponent)
    // .component('signOut',signOutComponent )
    .service('absFormService', absFormService)
    .service('absFormServiceLocal', absFormServiceLocal)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.absForm', {
                url: 'abstract',
                component: 'absForm',
                data: {
                    pageTitle: 'Submission Form'
                }
            })
            .state('app.absSubmitComplete', {
                url: 'abstract-submitted',
                component: 'absSubmitComplete',
                data: {
                    pageTitle: 'Submission Complete'
                }
            });
    })
    .name;

export default absFormModule;
