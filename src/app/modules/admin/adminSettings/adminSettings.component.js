import template from './adminSettings.html';
import './adminSettings.styl';

const adminSettingsComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class AdminSettingsController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'adminService', 'UserApi', '$mdDialog', '$state', 'systemSettingService'];
        }
        
        constructor($log, $timeout, $scope, adminService, UserApi, $mdDialog, $state, systemSettingService) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.adminService = adminService;
            this.UserApi = UserApi;
            this.$mdDialog = $mdDialog;
            this.$state = $state;
            this.systemSettingService = systemSettingService;

            this.settings;
            this.currentUser;
        }

        $onInit() {
            this.UserApi.getCurrentUser()
                .then(res => this.currentUser = res.data)
                .then(() => this.systemSettingService.getSystemSetting())
                .then(settings => settings.emailsOfAdmins.includes(this.currentUser.email) ? Promise.resolve() : Promise.reject())
                .catch(err => {
                    this.currentUser
                        ? this.$mdDialog.show(this.getAlertDialog('This page is for admins only'))
                            .then(() => this.$state.go('app.absResults'))
                        : this.$mdDialog.show(this.getAlertDialog('Please login to edit'))
                            .then(() => this.$state.go('app.user.signIn'));
                });
            this.getSettings();
        }

        getAlertDialog(title, textContent = '') {
            return this.$mdDialog.alert()
                .clickOutsideToClose(false)
                .title(title)
                .textContent(textContent)
                .ariaLabel(title)
                .ok('Got it!');
        }

        getSettings() {
            return this.adminService.getSettings()
                .then(data => this.settings = data)
                .catch(err => {
                    this.settings = false;
                    console.warn(err);
                    this.$mdDialog.warn(this.getAlertDialog('Failed to load settings', 'Check console for details'));
                });
        }

        submit() {
            this.settings.emailsOfAdmins = this.settings.emailsOfAdmins.filter(element => Boolean(element));
            this.adminService.updateSettings(this.settings)
                .then(res => 
                    this.$mdDialog.show(this.getAlertDialog('Update success')))
                .catch(err => {
                    console.warn(err);
                    this.$mdDialog.warn(this.getAlertDialog('Failed to update', 'Check console for details'));
                });
        }

        parseCamelCase(str) {
            let spaced = str.replace(/([A-Z])/g, ' $1').trim();
            return spaced[0].toUpperCase() + spaced.slice(1);
        }
    }
};
export default adminSettingsComponent;
