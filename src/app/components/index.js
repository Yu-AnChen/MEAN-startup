import printOutComponent from './printOut';

const componentModule = angular
    .module('app.core.components', [])
    .component('printOut', printOutComponent)
    .name;

export default componentModule;