import uiRouter from 'angular-ui-router';
import absPrintAdminComponent from './absPrintAdmin';
import adminComponent from './admin.component';
import adminSettingsComponent from './adminSettings';
import adminService from './services/admin.service';

const adminModule = angular
    .module('app.core.admin', [
        uiRouter
    ])
    .component('absPrintAdmin', absPrintAdminComponent)
    .component('admin', adminComponent)
    .component('adminSettings', adminSettingsComponent)
    .service('adminService', adminService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.admin', {
                url: 'admin',
                component: 'admin',
                data: {
                    pageTitle: 'Admin'
                }
            });
    })
    .name;

export default adminModule;
