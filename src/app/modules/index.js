import user from './user';
import absForm from './absForm';
import underConstruction from './underConstruction';

const Modules = angular
    .module('app.core.modules', [
        user,
        absForm,
        underConstruction,
    ])
    .name;

export default Modules;