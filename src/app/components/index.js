// import headerAndNav from './headerAndNav';
import footer from './footer';
import showcaseHeaderAndNav from './showcaseHeaderAndNav';

const componentModule = angular
    .module('app.core.components', [])
    // .component('headerAndNav', headerAndNav)
    .component('footer', footer)
    .component('showcaseHeaderAndNav', showcaseHeaderAndNav)
    .name;

export default componentModule;