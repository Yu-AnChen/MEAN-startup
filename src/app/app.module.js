import appComponent from './app.component';
import components from './components';

const appModule = angular
    .module('app.core', [
        components,
    ])
    .component('app', appComponent)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app', {
                url: '/',
                component: 'app'
            });
    })
    .name;

export default appModule;
