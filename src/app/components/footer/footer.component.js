import template from './footer.html';
import './footer.styl';

const footerComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class FooterController {
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
export default footerComponent;
