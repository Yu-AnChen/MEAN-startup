import template from './headerAndNav.html';
import './headerAndNav.styl';

const headerAndNavComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class headerAndNavController {
        static get $inject() {
            return ['$log', '$timeout', '$scope'];
        }
        constructor($log, $timeout, $scope) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
        }
        $onInit() {
            this.originatorEv;
            this.navigationLinks = this.getNavigationLinks();
        }

        openMenu($mdMenu, ev) {
            this.originatorEv = ev;
            $mdMenu.open(ev);
        }
        getNavigationLinks() {
            return {
                Home:     "https://symposium2017.ttbatw.org/",
                About:    "https://symposium2017.ttbatw.org/",
                Talk:     "https://symposium2017.ttbatw.org/",
                Location: "https://symposium2017.ttbatw.org/",
                Register: "https://symposium2017.ttbatw.org/",
            };
        }
    }
};
export default headerAndNavComponent;
