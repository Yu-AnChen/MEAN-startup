import template from './signUp.html';
import './signUp.styl';

const userSignUpComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class UserSignUpController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'UserApi', 'UserApiLocal','FormApi', '$state', 'focus', '$stateParams'];
        }
        constructor($log, $timeout, $scope, UserApi, UserApiLocal, FormApi, $state, focus, $stateParams) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.UserApi = UserApiLocal;
            this.UserApiLocal = UserApiLocal;
            this.FormApi = FormApi;
            this.$state = $state;
            this.$stateParams = $stateParams;
            this.focus = focus;
        }
        $onInit() {
            this.showView = false;
            this.getCurrentUser();
            this.userData = this.getUserData();
            this.alreadyExist = false;
            // this.autofocus();
            // this.focus('userEmail');
            // console.log(this.$stateParams);
        }
        autofocus() {
            this.focus('userEmail');
        }
        getUserData() {
            return {
                email: this.$stateParams.email,
                favoritePhrase: this.$stateParams.favoritePhrase,
                favoritePhraseConfirm: '',
                primaryAffiliation: ''
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
        signUp() {
            let userDbData = {
                email: this.userData.email.toLocaleLowerCase(),
                favoritePhrase: this.userData.favoritePhrase,
                primaryAffiliation: this.userData.primaryAffiliation,
                signInDate: [new Date()],
                signInCount: 1
            };
            
            console.log('saving to db now');
            this.UserApi.signup(userDbData).then((res)=>{
                if (res.status == 200) {
                    // console.log(res.data);
                    // this.$state.go('tooooo', {email: res.data.email}); // $stateParams
                    console.log(this.$stateParams);
                    if (Object.keys(this.$stateParams.unsavedData).length) {
                        this.$stateParams.unsavedData.email = res.data.email;
                        
                        this.FormApi.save(this.$stateParams.unsavedData).then(()=>{
                            this.$state.go('app.absForm');
                        }, ()=>{});
                        // this.FormApi.updateEmail(this.$stateParams.absId, {email: res.data.email}).then(()=>{
                        //     this.$state.go('app.absForm', {email: res.data.email});
                        // // errorCalback NEEDED
                        // });
                    } else {
                        this.$state.go('app.absForm', {email: res.data.email});
                    }
                }
            }, (res)=>{
                if (res.status == 403 && res.data == 'email already exist') {
                    // fix for using locally
                    this.$timeout(() => { this.alreadyExist = true; }, 10);
                    // this.alreadyExist = true;
                    console.log(res);
                } else {
                    console.log('other error');
                }
            });
        }
        goSignIn() {
            this.$state.go('app.user.signIn', { 
                email : this.userData.email, 
                favoritePhrase : this.userData.favoritePhrase 
            });
        }
        goRoot() {
            this.$state.go('app');
        }
    }
    
};
export default userSignUpComponent;
