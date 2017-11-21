import user from './user';
import absForm from './absForm';
import underConstruction from './underConstruction';
import admin from './admin';
import absResults from './absResults';
import overview from './overview';

const Modules = angular
    .module('app.core.modules', [
        user,
        absForm,
        underConstruction,
        admin,
        absResults,
        overview
    ])
    .name;

export default Modules;