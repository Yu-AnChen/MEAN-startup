import template from './signIn.html';
import './signIn.styl';

const userSignInComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class UserSignUpController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'UserApi', '$state', '$stateParams', 'focus', 'systemSettingService'];
        }
        constructor($log, $timeout, $scope, UserApi, $state, $stateParams, focus, systemSettingService) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.UserApi = UserApi;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.focus = focus;
            this.systemSettingService = systemSettingService;
        }
        $onInit() {
            this.showView = false;
            this.systemSettingService.getSystemSetting()
                .then(data => this.submissionDeadline = data.submissionDeadline);
            this.getCurrentUser();
            this.userData = this.getUserData();
            this.email = this.$stateParams.email;
            this.notExist = false;
            this.notMatch = false;
            // this.autofocus();
        }
        autofocus() {
            this.focus('userEmail');
        }
        getUserData() {
            return {
                email: this.$stateParams.email,
                favoritePhrase: this.$stateParams.favoritePhrase,
            };
        }
        getCurrentUser() {
            this.UserApi.getCurrentUser().then((res)=>{
                // console.log(res.data);
                if (res.data.email) {
                    this.$state.go('app.absForm', {email: res.data.email});
                }
            }, ()=>{
                this.showView = true;
                this.autofocus();
            });
        }
        signIn() {
            let userDbData = {
                email: this.userData.email.toLocaleLowerCase(),
                favoritePhrase: this.userData.favoritePhrase,
                signInDate: new Date()
            };
            this.UserApi.signin(userDbData).then((res)=>{
                if (res.status == 200) {
                    this.$state.go('app.absForm', {email: res.data.email});
                }
            }, (res)=>{
                if (res.status == 404 && res.data == 'db.find:x,db.update:x') {
                    this.notExist = true;
                    // console.log(res);
                } 
                if (res.status == 404 && res.data =='db.find:x-password,db.update:x') {
                    this.notMatch = true;
                    // console.log('password error!')
                } else {
                    console.log('other error');
                }
            });
        }
        goSignUp() {
            this.$state.go('app.user.signUp', { 
                email : this.userData.email, 
                favoritePhrase : this.userData.favoritePhrase 
            });
        }
        goRoot() {
            this.$state.go('app');
        }
        clearInput() {
            this.userData = this.getUserData();
            this.autofocus();
        }
    }
    
};
export default userSignInComponent;
