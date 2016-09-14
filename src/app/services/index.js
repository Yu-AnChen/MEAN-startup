import formApiService from './formApi';
import userApi from './userApi';

const serviceModule = angular
    .module('app.services', [])
    .service('FormApi', formApiService)
    .service('UserApi', userApi)
    .name;

export default serviceModule;