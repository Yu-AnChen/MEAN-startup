import template from './absResults.html';
import './absResults.styl';

const absResultsComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class AbsResultsController {
        static get $inject() {
            return ['$log', '$timeout', '$scope'];
        }
        constructor($log, $timeout, $scope) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
        }
    }
};
export default absResultsComponent;
