import template from './absSubmitComplete.html';
import './absSubmitComplete.styl';

const absSubmitCompleteComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class AbsSubmitCompleteController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'FormApi', 'UserApi', '$state'];
        }
        constructor($log, $timeout, $scope, FormApi, UserApi, $state) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.FormApi = FormApi;
            this.UserApi = UserApi;
            this.$state = $state
        }
        $onInit() {
            this.buildForm();
            this.getSubmittedAbs = false;
        }
        // DATABASE
        buildForm() {
            this.UserApi.getCurrentUser().then((res)=>{
                this.getAbstract(res.data.email);
                this.currentUser = true;
            },(res)=>{
                // this.submissionComplete = false;
                // this.form = this.getFormNewUser();
                this.currentUser = false;
                this.dataLoaded = true;
            });
        }
        getAbstract(email, title) {
            this.FormApi.get(email, title).then((res)=>{
                console.log('get data from server');
                this.form = res.data[0];
                this.getSubmittedAbs = true;
                this.dataLoaded = true;
            }, ()=>{
                this.getSubmittedAbs = false;
                this.dataLoaded = true;
            });
        }
        
        // ROUTE
        goSignIn() {
            this.$state.go('app.user.signIn');
        }
        goAbsForm() {
            this.$state.go('app.absForm');
        }
        signOut() {
            console.log('signing out');
            this.UserApi.signout(this.userData).then((res)=>{
                console.log(res);
                if (res.status == 200) {
                    // this.$state.go('tooooo', {email: res.data.email}); // $stateParams
                    console.log('sign out succed!')
                    // this.$state.go('app.user.signIn', {email: ''});
                    window.location = "http://www.ttbatw.org/";
                    
                } else {
                    console.log('keeptrying');
                }
            });
        }
    }
};
export default absSubmitCompleteComponent;
