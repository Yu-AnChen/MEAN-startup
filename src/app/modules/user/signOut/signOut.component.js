import template from './signOut.html';
import './signOut.styl';

const userSignOutComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class UserSignUpController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', 'UserApi', '$state', '$stateParams'];
        }
        constructor($log, $timeout, $scope, UserApi, $state, $stateParams) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.UserApi = UserApi;
            this.$state = $state;
            this.$stateParams = $stateParams;
        }
        $onInit() {
            this.userData = this.getUserData();
            this.email = this.$stateParams.email;
        }
        
        getUserData() {
            return {
                email: '',
                password: '',
                passwordConfirm: '',
                primaryAffil: ''
            };
        }
        signOut() {
            this.UserApi.signout(this.userData).then((res)=>{
                if (res.status == 200) {
                    // this.$state.go('tooooo', {email: res.data.email}); // $stateParams
                    this.$state.go('app.user.signIn', {email: ''});
                    
                } else {
                    console.log('signOut failed');
                }
            });
        }
    }
    
};
export default userSignOutComponent;
