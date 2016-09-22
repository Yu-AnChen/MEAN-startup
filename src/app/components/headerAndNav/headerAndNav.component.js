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

        openMenu($mdOpenMenu, ev) {
          this.originatorEv = ev;
          $mdOpenMenu(ev);
        }
        getNavigationLinks() {
            return {
                Home:     "http://www.symposium2016.ttbatw.org/",
                Speakers: "http://www.symposium2016.ttbatw.org/speakers",
                Schedule: "http://www.symposium2016.ttbatw.org/schedule",
                Venue:    "http://www.symposium2016.ttbatw.org/venue",
                Register: "http://www.symposium2016.ttbatw.org/register",
            }
        }
    }
};
export default headerAndNavComponent;
