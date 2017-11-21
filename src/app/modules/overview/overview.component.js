import template from './overview.html';
import './overview.styl';

const overviewComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class OverviewController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$state'];
        }
        constructor($log, $timeout, $scope, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$state = $state;
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
