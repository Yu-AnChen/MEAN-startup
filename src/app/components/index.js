import headerAndNav from './headerAndNav';
import footer from './footer';

const componentModule = angular
    .module('app.core.components', [])
    .component('headerAndNav', headerAndNav)
    .component('footer', footer)
    .name;

export default componentModule;