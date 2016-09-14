import headerAndNav from './headerAndNav';

const componentModule = angular
    .module('app.core.components', [])
    .component('headerAndNav', headerAndNav)
    .name;

export default componentModule;