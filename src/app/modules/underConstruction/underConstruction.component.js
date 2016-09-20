import template from './underConstruction.html';
import './underConstruction.styl';

const underConstructionComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class UnderConstructionController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$stateParams'];
        }
        constructor($log, $timeout, $scope, $stateParams) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$stateParams = $stateParams
        }
        $onInit() {
            this.navName = this.$stateParams.navName;
        }
    }
};
export default underConstructionComponent;
