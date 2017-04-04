import formApiService from './formApi';
import formApiLocalService from './formApiLocal';
import userApi from './userApi';
import userApiLocal from './userApiLocal';

const serviceModule = angular
    .module('app.services', [])
    .service('FormApi', formApiService)
    .service('FormApiLocal', formApiLocalService)
    .service('UserApi', userApi)
    .service('UserApiLocal', userApiLocal)
    .name;

export default serviceModule;