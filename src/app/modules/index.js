import user from './user';
import absForm from './absForm';
import underConstruction from './underConstruction';
import admin from './admin';

const Modules = angular
    .module('app.core.modules', [
        user,
        absForm,
        underConstruction,
        admin,
    ])
    .name;

export default Modules;