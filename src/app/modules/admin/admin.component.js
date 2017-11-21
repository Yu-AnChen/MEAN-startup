import template from './admin.html';
import './admin.styl';

const adminComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class AdminController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'FormApi', 'adminService', '$state', '$mdDialog', '$filter'];
        }
        constructor($log, $timeout, $scope, FormApi, adminService, $state, $mdDialog, $filter) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.FormApi = FormApi;
            this.adminService = adminService;
            this.$state = $state;
            this.$mdDialog = $mdDialog;
            this.$filter = $filter;
        }
        $onInit() {
            console.log(this.$state.current.url);
            this.selectAllAbs = [];
            this.getAbstracts();
            this.sortBy = 'lastSubmittedAt';
            this.sortByOptions = {
                name: ["Title", "Author", "Field", 'Talk order', 'Location', 'Submission time'],
                value: ["title", "fileId", "field", 'elevatorTalkOrder', 'whichLocation', 'lastSubmittedAt']
            };
            this.displaySetting = {
                showAffil: false,
                showKeywords: false,
                showAbsContent: false,
                showEmails: false,
            };
            this.selectedAbs = [];

            // this.$mdDialog.show({
            //     // targetEvent: $event,
            //     clickOutsideToClose: true,
            //     template:
            //         '<md-dialog>' +

            //         '  <md-dialog-content><abs-form></abs-form></md-dialog-content>' +

            //         '  <md-dialog-actions>' +
            //         '    <md-button ng-click="closeDialog()" class="md-primary">' +
            //         '      Close Greeting' +
            //         '    </md-button>' +
            //         '  </md-dialog-actions>' +
            //         '</md-dialog>',
            //     // controller: 'GreetingController',
            //     // onComplete: afterShowAnimation,
            //     // locals: { employee: $scope.userName }
            // });
        }
        $onDestroy(){
        }
        strToBoolean(str) {
            return str.toString() === 'true' ? true : false;
        }
        getAbstracts() {
            // let rawData = [];
            this.FormApi.getAbstracts()
            .then(
                (res)=>{
                    let rawData = res.data;
                    rawData.forEach(element => {
                        element.selectedForTalk = !element.selectedForTalk 
                            ? false
                            : true;
                        element.lastSubmittedAt = this.getLastSubmittedAt(element.submittedAt);
                    });
                    this.abstracts = rawData;
                },
                ()=>{
                    console.log('error: getAbstracts');
                }
            );
        }
        filterSelected(abstracts) {
            // return abstracts;
            return this.$state.current.url === '/results'
                ? abstracts.filter(element => element.selectedForTalk)
                : abstracts;
            
        }
        getLastSubmittedAt(submittedAt) {
            if (!submittedAt || !submittedAt.length) {
                return 'Did not submit.';
            }
            return new Date(submittedAt.slice(-1)[0]);
        }
        taskOn(){
            this.busy = true;
            // other dom
        }
        taskDone(){
            this.busy = false;
            // other dom
        }
        isTaskOn(){
            return (this.busy)? true : false;
        }
        updateTalkStatus(obj) {
            this.taskOn();
            const _id = obj._id;
            const updateData = { selectedForTalk: obj.selectedForTalk }
            this.FormApi.update(_id, updateData)
            .then(
                ()=> {
                    console.log('sucess: updateTalkStatus');
                    this.taskDone();
                },
                ()=> {
                    console.log('error: updateTalkStatus');
                    this.taskDone();
                });

        }
        replaceSpace(str) {
            return str.replace(/\s/g, '-');
        }
        toggleSelectAbs(item) {
            this.selectedAbs = this.selectedAbs.includes(item)
                ? this.selectedAbs.filter(element => element !== item)
                : [...this.selectedAbs, item];
        }
        absSelected(item, list) {
            return list.indexOf(item) > -1;
        }
        toggleSelectAll() {
            let allAbstracts = this.filterSelected(this.abstracts);
            if (this.selectedAbs.length == allAbstracts.length) {
                this.selectedAbs = [];
            } else {
                this.selectedAbs = allAbstracts;
            }
        }
        allSelected() {
            return this.selectedAbs.length == this.filterSelected(this.abstracts).length;
        }
        generateFile(selectedAbs) {
            selectedAbs.forEach(element => {
                let label = document
                    .querySelector('#label_' + element._id + ' .md-label')
                    .innerHTML.trim();
                if (label.length === 1) { label = '0' + label; }
                let absElId = '#abs_' + element._id;
                // let location = !element.whichLocation 
                //     ? 'Unknown' 
                //     : element.whichLocation.split(',').slice(-1)[0].trim();
                let author = element.authors[0].name.split(' ').join('_');
                let lastSubmittedAt = this.$filter('date')(element.lastSubmittedAt, 'yyyy-MM-dd-H-mm', 'CST');
                // let outputFileName = `${location}_${label}_${author}.docx`;
                let outputFileName = `${label}_${lastSubmittedAt}_${author}.docx`;

                saveAs(this.convertHtmlToDocx(absElId),  outputFileName);
            });
        }
        
        convertHtmlToDocx(elementId) {
            // $document
            // this.$document[0].getElementById();
            var el = document.querySelector(elementId);
            // some custom code for formatting
            var indexForDeletion = el.innerHTML.lastIndexOf("<br>");
            var strForDocx = el.innerHTML.substring(0, indexForDeletion) + 
                             el.innerHTML.substring(indexForDeletion+4);
            var content = '<!DOCTYPE html>'+ `
            <style>
            body {
                font-family: Arial;
                font-size: 14.5px;
                line-height: 25px;
            }
            
            .abs_title {
                font-weight: 600;
                margin-top: 0px;
                margin-bottom: 29px;
                font-size: 14.5px;
            }
            .wrapper-author {
                font-weight: 400;
                margin-bottom: -290px;
            }
            .wrapper-affil {
                font-size: 12.75px;
                margin-top: 0px;
                margin-bottom: 29px;
            }
            .wrapper-keywords {
                font-size: 13px;
                font-style: italic;
                font-weight: 600;
                margin-top: 0px;
                margin-bottom: 14.5px;
            }
            .wrapper-abs-content {
                text-align: justify;
            }
            </style>
            ` + '<body>' + strForDocx + '</body>';
            var converted = htmlDocx.asBlob(content);
            return converted;
        }
    }
};
export default adminComponent;
