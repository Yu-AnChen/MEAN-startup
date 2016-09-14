// import template from './user.html';
import './user.styl';

const userComponent = {
    template: `
        <div ui-view class="user"></div>
    `,
    bindings: {

    },
    controller: /* @ngInject */ class UserController {
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
export default userComponent;
