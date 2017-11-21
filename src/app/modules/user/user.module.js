import uiRouter from 'angular-ui-router';
import userComponent from './user.component';
import userService from './services/user.service';
import signUpComponent from './signUp';
import signInComponent from './signIn';
// import signOutComponent from './signOut';
const userParams = {
    email: '',
    favoritePhrase: '',
    absId: '',
    unsavedData: {}
};

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
                url: '/user', // url: '/' << app
                params: userParams,
                component: 'user'
            })
            .state('app.user.signUp', {
                url: '/create',
                params: userParams,
                data: {
                    pageTitle: 'Create Abstract'
                },
                component: 'signUp'
            })
            .state('app.user.signIn', {
                url: '/edit',
                params: userParams,
                data: {
                    pageTitle: 'Edit Abstract'
                },
                component: 'signIn'
            })
            .state('app.user.signOut', {
                url: '/signOut',
                params: userParams,
                component: 'signOut'
            });
    })
    .name;

export default userModule;