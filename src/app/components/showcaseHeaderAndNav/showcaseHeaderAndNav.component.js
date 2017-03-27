import template from './showcaseHeaderAndNav.html';
import './showcaseHeaderAndNav.styl';

const showcaseHeaderAndNavComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class ShowcaseHeaderAndNavController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$state'];
        }
        constructor($log, $timeout, $scope, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$state = $state;
        }
    }
};
export default showcaseHeaderAndNavComponent;
