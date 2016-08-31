import template from './XXXXXX.html';
import './XXXXXX.styl';

const XXXXXXComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class XXXXXXController {
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
export default XXXXXXComponent;
