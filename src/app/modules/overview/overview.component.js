import template from './overview.html';
import './overview.styl';

const overviewComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class OverviewController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$state', 'METADATA'];
        }
        constructor($log, $timeout, $scope, $state, METADATA) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$state = $state;
            this.METADATA = METADATA;
        }
        goSignUp() {
            this.$state.go('app.user.signUp');
        }
        goResults() {
            this.$state.go('app.absResults');
        }
    }
};
export default overviewComponent;
