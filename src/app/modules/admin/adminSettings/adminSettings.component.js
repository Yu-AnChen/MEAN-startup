import template from './adminSettings.html';
import './adminSettings.styl';

const adminSettingsComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class AdminSettingsController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'adminService'];
        }
        
        constructor($log, $timeout, $scope, adminService) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.adminService = adminService;

            this.settings;
        }

        $onInit() {
            this.getSettings();
        }

        getSettings() {
            return this.adminService.getSettings()
                .then(data => this.settings = data)
                // .then((res) => {
                //     console.log(res.data);
                //     res.data.submissionDeadline = new Date(res.data.submissionDeadline);
                //     this.settings = res.data;
                // }, 
                .catch(err => {
                    this.settings = false;
                    console.info(err);
                });
                // (err) => {
                //     this.settings = false;
                //     console.info(err);
                // });
        }

        submit() {
            this.settings.emailsOfAdmins = this.settings.emailsOfAdmins.filter(element => Boolean(element));
            this.adminService.updateSettings(this.settings)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

        parseCamelCase(str) {
            let spaced = str.replace(/([A-Z])/g, ' $1').trim();
            return spaced[0].toUpperCase() + spaced.slice(1);
        }
    }
};
export default adminSettingsComponent;
