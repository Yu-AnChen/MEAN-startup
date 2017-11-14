/* @ngInject */
class adminService {

    static get $inject() {
        return ['$http'];
    }

    constructor($http) {
        this.$http = $http;
        this.data = {
            // something: 'string'
        };
    }

    getSettings() {
        return this.$http.get('/admin/')
            .then(res => {
                let data = res.data[0];
                data.submissionDeadline = new Date(data.submissionDeadline);
                return Promise.resolve(data);
            });
    }
    initSettings() {
        return this.$http.post('/admin/init');
    }
    updateSettings(data) {
        console.log(data);
        return this.$http.put('/admin/', data);
    }

    // public api
    cleanup(){
        this.data = null;
    }
    storeData(data){
        this.data = data;
        console.log(this.data);
        return;
    }
    getData(){
        let variable = 123123123123;
        const var2 = 'dasdasd';
        console.log(this.data);
        console.log(this);
        return this.data;
    }
    // internal use only
    _formatData(){
        this.data == data;
    }
}

export default adminService;
