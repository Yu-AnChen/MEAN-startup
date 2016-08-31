import printOutComponent from './printOut';
import absFormInputComponent from './absFormInput';

const componentModule = angular
    .module('app.core.components', [])
    .component('printOut', printOutComponent)
    .component('absFormInput', absFormInputComponent)
    .name;

export default componentModule;