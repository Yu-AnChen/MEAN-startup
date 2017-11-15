import template from './goToResultButton.html';
import './goToResultButton.styl';

const goToResultButtonComponent = {
    template,
    bindings: {
        buttonTheme: '<',
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
            this.buttonTheme = !this.buttonTheme 
                ? 'md-primary' : this.buttonTheme;
        }

        $onInit() {
            this.systemSettingService.getSystemSetting()
                .then(data => this.$timeout(() => this.showGoToResultButton = data.showGoToResultButton), 0)
                // .then(() => this.$scope.$apply())
                .then(() => console.log(this.showGoToResultButton))
                .catch(err => console.info(err));
        }
    }
};
export default goToResultButtonComponent;
