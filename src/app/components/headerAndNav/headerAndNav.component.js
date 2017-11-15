import template from './headerAndNav.html';
import './headerAndNav.styl';

const headerAndNavComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class headerAndNavController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$state'];
        }
        constructor($log, $timeout, $scope, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$state = $state;
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
                Home:     "https://symposium2017.ttbatw.org/website",
                About:    "https://symposium2017.ttbatw.org/website#about",
                Talk:     "https://symposium2017.ttbatw.org/website#talk",
                Location: "https://symposium2017.ttbatw.org/website#location",
                Register: "https://www.eventbrite.com/e/ttba-symposium-2017-registration-37658097383",
            };
        }
    }
};
export default headerAndNavComponent;
