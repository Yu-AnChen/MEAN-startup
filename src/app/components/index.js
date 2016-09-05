import printOutComponent from './printOut';
import absFormInputComponent from './absFormInput';
import headerAndNavComponent from './headerAndNav';

const componentModule = angular
    .module('app.core.components', [])
    .component('printOut', printOutComponent)
    .component('absFormInput', absFormInputComponent)
    .component('headerAndNav', headerAndNavComponent)
    .name;

export default componentModule;