import template from './goToResultButton.html';
import './goToResultButton.styl';

const goToResultButtonComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class GoToResultButtonController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$state', 'systemSettingService'];
        }

        constructor($log, $timeout, $scope, $state, systemSettingService) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$state = $state;
            this.systemSettingService = systemSettingService;

            this.showGoToResultButton;
        }

        $onInit() {
            this.systemSettingService.getSystemSetting()
                .then(data => this.showGoToResultButton = data.showGoToResultButton)
                .catch(err => console.info(err));
        }
    }
};
export default goToResultButtonComponent;
