import uiRouter from 'angular-ui-router';
import userComponent from './user.component';
import userService from './services/user.service';
import signUpComponent from './signUp';
import signInComponent from './signIn';
// import signOutComponent from './signOut';

const userModule = angular
    .module('app.core.user', [
        uiRouter
    ])
    .component('user', userComponent)
    .component('signUp', signUpComponent)
    .component('signIn', signInComponent)
    // .component('signOut', signOutComponent)
    .service('userService', userService)
    .config(($stateProvider) => {
        'ngInject';
        $stateProvider
            .state('app.user', {
                url: 'user', // url: '/' << app
                params: {
                    email: '',
                    favoritePhrase: '',
                    absId: '',
                    unsavedData: {}
                },
                component: 'user'
            })
            .state('app.user.signUp', {
                url: '/create',
                params: {
                    email: '',
                    favoritePhrase: '',
                    absId: '',
                    unsavedData: {}
                },
                data: {
                    pageTitle: 'Create Abstract'
                },
                component: 'signUp'
            })
            .state('app.user.signIn', {
                url: '/edit',
                params: {
                    email: '',
                    favoritePhrase: '',
                    absId: '',
                    unsavedData: {}
                },
                data: {
                    pageTitle: 'Edit Abstract'
                },
                component: 'signIn'
            })
            .state('app.user.signOut', {
                url: '/signOut',
                params: {
                    email: '',
                    favoritePhrase: '',
                    absId: '',
                    unsavedData: {}
                },
                component: 'signOut'
            });
    })
    .name;

export default userModule;