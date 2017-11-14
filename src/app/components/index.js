import headerAndNav from './headerAndNav';
import footer from './footer';
import redirectDialogWhenSubmissionIsClose from './redirectDialogWhenSubmissionIsClose';

const componentModule = angular
    .module('app.core.components', [])
    .component('headerAndNav', headerAndNav)
    .component('footer', footer)
    .component('redirectDialogWhenSubmissionIsClose', redirectDialogWhenSubmissionIsClose)
    .name;

export default componentModule;