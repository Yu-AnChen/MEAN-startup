import './app.styl';
import template from './app.html';

const appComponent = {
    template,
    controller: /* @ngInject */ 
    class AppController {
        static get $inject() {
            return ['$timeout', 'METADATA', '$state'];
        }
        constructor($timeout, METADATA, $state) {
            this.$timeout = $timeout;
            this.METADATA = METADATA;
            this.$state = $state;
        }
        $onInit(){
            // this.$state.go('app.directions');
        }
        goSignUp() {
            this.$state.go('app.user.signUp');
        }
        goResults() {
            this.$state.go('app.absResults');
        }
    },
};

export default appComponent;
