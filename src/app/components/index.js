import headerAndNav from './headerAndNav';
import footer from './footer';
import redirectDialogWhenSubmissionIsClose from './redirectDialogWhenSubmissionIsClose';
import goToResultButton from './goToResultButton';

const componentModule = angular
    .module('app.core.components', [])
    .component('headerAndNav', headerAndNav)
    .component('footer', footer)
    .component('redirectDialogWhenSubmissionIsClose', redirectDialogWhenSubmissionIsClose)
    .component('goToResultButton', goToResultButton)
    .name;

export default componentModule;