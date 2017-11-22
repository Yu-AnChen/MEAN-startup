import template from './footer.html';
import './footer.styl';

const footerComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class FooterController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'METADATA'];
        }
        constructor($log, $timeout, $scope, METADATA) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.METADATA = METADATA;
        }
    }
};
export default footerComponent;
