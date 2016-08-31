import formApiService from './formApi';

const serviceModule = angular
    .module('app.services', [])
    .service('FormApi', formApiService)
    .name;

export default serviceModule;