import template from './admin.html';
import './admin.styl';

const adminComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class AdminController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'FormApi', 'adminService', '$state'];
        }
        constructor($log, $timeout, $scope, FormApi, adminService, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.FormApi = FormApi;
            this.adminService = adminService;
            this.$state = $state;
        }
        $onInit() {
            
            console.log(this.$state.current.url);
            this.selectAllAbs = [];
            this.getAbstracts();
            this.sortBy = '';
            this.sortByOptions = {
                name: ["Title", "Author", "Field"],
                value: ["title", "fileId", "field"]
            };
            this.displaySetting = {
                showAffil: false,
                showKeywords: false,
                showAbsContent: false,
                showEmails: false,
            };
            this.selectedAbs = [];
            
            // this.adminService.getData();
            // this.adminService.storeData({'change':'value'});
        }
        $onDestroy(){
            // this.adminService.cleanup();
        }
        strToBoolean(str) {
            return str === "true" ? true : false;
        }
        getAbstracts() {
            // let rawData = [];
            this.FormApi.getAbstracts()
            .then(
                (res)=>{
                    let rawData = res.data;
                    
                    for (let i=0; i<rawData.length; i++) {
                        let authorNameArray = rawData[i].authors[0].name.split(' ');
                        rawData[i].fileId = authorNameArray[authorNameArray.length-1] + "_" + authorNameArray[0];
                        rawData[i].fieldNoSpace = rawData[i].field.replace(/\s/g, '-');
                        this.selectAllAbs.push(rawData[i].fieldNoSpace+'-'+rawData[i].fileId);
                        if (rawData[i].selectedForTalk === undefined) {
                            rawData[i].selectedForTalk = false;
                        }
                    }
                    // console.log(this.selectAllAbs);
                    this.abstracts =  rawData;
                    
                },
                ()=>{
                    console.log('error: getAbstracts');
                }
            );
            
            // for (let i=0; i<rawData.length; i++) {
            //     let authorNameArray = rawData[i].authors[0].name.split(' ');
            //     rawData[i].fileId = authorNameArray[authorNameArray.length-1] + "_" + authorNameArray[0];
            //     rawData[i].fieldNoSpace = rawData[i].field.replace(/\s/g, '-');
            //     this.selectAllAbs.push(rawData[i].fieldNoSpace+'-'+rawData[i].fileId);
            // }
            // console.log(this.selectAllAbs);
            // return rawData;
            
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
                })

        }
        replaceSpace(str) {
            return str.replace(/\s/g, '-');
        }
        toggleSelectAbs(email, selectedList) {
            let idx = selectedList.indexOf(email);
            if (idx > -1) {
                selectedList.splice(idx, 1);
            } else {
                selectedList.push(email);
            }
        }
        absSelected(item, list) {
            return list.indexOf(item) > -1;
        }
        toggleSelectAll() {
            if (this.selectedAbs.length == this.abstracts.length) {
                this.selectedAbs = [];
            } else {
                this.selectedAbs = this.selectAllAbs;
            }
        }
        allSelected() {
            return this.selectedAbs.length == this.abstracts.length;
        }
        generateFile(selectedAbs) {
            for (let i=0; i<selectedAbs.length; i++) {
                let label = document.querySelector(
                                '#label_' + selectedAbs[i] + ' .md-label'
                            ).innerHTML.trim();
                if (label.length === 1) {
                    label = "0" + label;
                }
                console.log(label);
                let absElId = '#abs_' + selectedAbs[i];
                saveAs(this.convertHtmlToDocx(absElId),  label + '_' + selectedAbs[i] + '.docx');
            }
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
