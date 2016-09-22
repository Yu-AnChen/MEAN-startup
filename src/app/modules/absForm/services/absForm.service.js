/* @ngInject */
class absFormService {
    static get $inject() {
        return ['$http'];
    }
    constructor($http) {
        this.$http = $http;
    }
    
    sendAbsPrintEl(data) {
        return this.$http.post('/toPdf/', data);
    }
    getPdfUrl(email) {
        return this.$http.get('/toPdf/' + email);
    }
    // data = {
    //     email: currentUser.email,
    //     html: element.html
    // }
}

export default absFormService;
