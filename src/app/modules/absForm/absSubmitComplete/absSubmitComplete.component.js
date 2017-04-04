import template from './absSubmitComplete.html';
import './absSubmitComplete.styl';

const absSubmitCompleteComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class AbsSubmitCompleteController {
        static get $inject() {
            return ['$window', '$log', '$timeout', '$scope', '$location', 'FormApi', 'FormApiLocal', 'UserApi', 'UserApiLocal', '$state', 'absFormService', 'absFormServiceLocal'];
        }
        constructor($window, $log, $timeout, $scope, $location, FormApi, FormApiLocal, UserApi, UserApiLocal, $state, absFormService, absFormServiceLocal) {
            this.$window = $window;
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$location = $location;
            this.FormApi = FormApiLocal;
            this.FormApiLocal = FormApiLocal;
            this.UserApi = UserApiLocal;
            this.UserApiLocal = UserApiLocal;
            this.$state = $state;
            this.absFormService = absFormServiceLocal;
            this.absFormServiceLocal = absFormServiceLocal;
        }
        $onInit() {
            // this.form = {};
            this.buildForm();
            this.getSubmittedAbs = false;
            this.resultTimeoutDelay = 1500;
            this.pdfLink = '#';
            this.absFormService.getPdfUrl();
        }
        $onChange() {
        }
        
        // DATABASE
        buildForm() {
            this.UserApi.getCurrentUser().then((res)=>{
                this.getAbstract(res.data.email);
                // this.getPdfLink(res.data.email);
                this.currentUser = res.data;
            },(res)=>{
                // this.submissionComplete = false;
                // this.form = this.getFormNewUser();
                this.currentUser = false;
                // this.dataLoaded = true;
                this.$timeout(()=>{this.dataLoaded = true;}, this.resultTimeoutDelay);
            });
        }
        getAbstract(email, title) {
            this.FormApi.get(email, title).then((res)=>{
                console.log('get data from server');
                this.form = res.data[0];
                this.getSubmittedAbs = true;
                // this.dataLoaded = true;
                this.$timeout(()=>{this.dataLoaded = true;}, this.resultTimeoutDelay);
            }, ()=>{
                this.getSubmittedAbs = false;
                // this.dataLoaded = true;
                this.$timeout(()=>{this.dataLoaded = true;}, this.resultTimeoutDelay);
            });
        }
        getPdfLink(email) {
            this.absFormService.getPdfUrl(email).then((res)=>{
                // console.log(res);
                this.pdfLink = res.data;
            },()=>{
                console.log('error: generate pdf link failed')
                this.pdfLink = "#";
            });
        }
        genDocx() {
            saveAs(
                this.absFormService.convertHtmlToDocx('abs-print'),
                'test.docx'
            );
        }
        
        // ROUTE
        goSignIn() {
            this.$state.go('app.user.signIn');
        }
        goAbsForm() {
            this.$state.go('app.absForm');
        }
        goRoot() {
            this.$state.go('app');
        }
        signOut() {
            this.UserApi.signout(this.userData).then((res)=>{
                if (res.status == 200) {
                    // this.$state.go('tooooo', {email: res.data.email}); // $stateParams
                    // this.$state.go('app.user.signIn', {email: ''});
                    window.location = "http://www.symposium2016.ttbatw.org/";
                    
                } else {
                    console.log('error: signout');
                }
            });
        }
    }
};
export default absSubmitCompleteComponent;
