/* @ngInject */
class adminService {
    constructor() {
        this.data = {
            // something: 'string'
        };
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
