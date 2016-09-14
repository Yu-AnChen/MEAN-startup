import user from './user';
import absForm from './absForm';

const Modules = angular
    .module('app.core.modules', [
        user,
        absForm,
    ])
    .name;

export default Modules;