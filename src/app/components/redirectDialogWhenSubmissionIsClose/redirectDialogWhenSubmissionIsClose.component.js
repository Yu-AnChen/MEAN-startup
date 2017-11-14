import template from './redirectDialogWhenSubmissionIsClose.html';
import './redirectDialogWhenSubmissionIsClose.styl';

const redirectDialogWhenSubmissionIsCloseComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ class headerAndNavController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$mdDialog', 'systemSettingService', '$filter', '$state'];
        }
        constructor($log, $timeout, $scope, $mdDialog, systemSettingService, $filter, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.systemSettingService = systemSettingService;
            this.$filter = $filter;
            this.$state = $state;

            this.submissionDeadline;
            this.isBeforeDeadline;
            this.dialogContent;
        }
        $onInit() {
            this.originatorEv;
            this.systemSettingService.getSystemSetting()
                .then(data => this.submissionDeadline = data.submissionDeadline)
                .then(() => this.makeDialog(this.submissionDeadline))
                .then(() => this.$mdDialog.show(this.dialogContent))
                .then(() => this.okCallback(), () => this.cancelCallback())
                .catch(err => console.info(err));
        }

        openMenu($mdMenu, ev) {
            this.originatorEv = ev;
            $mdMenu.open(ev);
        }

        makeDialog(date) {
            this.isBeforeDeadline = new Date() < new Date(date);
            this.dialogContent = this.$mdDialog.confirm()
                .title(`Submission deadline - ${this.$filter('date')(this.submissionDeadline, 'MMMM d, y')}`)
                .textContent(this.isBeforeDeadline 
                    ? 'We are accepting abstracts!' 
                    : 'We are sorry, the submission is due and the system is closed. Would you like to')
                .ariaLabel('redirect dialog if submission ends')
                .ok(this.isBeforeDeadline 
                    ? 'I\'m ready!'
                    : 'browse all abstracts')
                .cancel(this.isBeforeDeadline 
                    ? ''
                    : 'proceed anyway');
        }

        okCallback() {
            return this.isBeforeDeadline
                ? true
                : this.$state.go('app.absResults');
        }

        cancelCallback() {
            return this.isBeforeDeadline
                ? true
                : false;
        }

    }
};
export default redirectDialogWhenSubmissionIsCloseComponent;
