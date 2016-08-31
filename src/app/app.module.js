import appComponent from './app.component';
import components from './components';
import services from './services'

const appModule = angular
    .module('app.core', [
        components,
        services,
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
