import formApiService from './formApi';
import userApi from './userApi';
import systemSettingService from './systemSettingService';

const serviceModule = angular
    .module('app.services', [])
    .service('FormApi', formApiService)
    .service('UserApi', userApi)
    .service('systemSettingService', systemSettingService)
    .name;

export default serviceModule;