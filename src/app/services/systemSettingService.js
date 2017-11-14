/* @ngInject */
class systemSettingService {

    static get $inject() {
        return ['$http'];
    }

    constructor($http) {
        this.$http = $http;
        this.systemSetting;
    }

    getSystemSetting() {
        return !this.systemSetting 
        ? this._getSystemSetting()
        : new Date() - this.systemSetting.cachedAt > 60000 * 60 * 24
        ? this._getSystemSetting()
        : Promise.resolve(this.systemSetting);
    }
    
    _getSystemSetting() {
        return this.$http.get('/systemSetting/')
            .then(res => {
                let data = res.data;
                data.currentAdminSettings.submissionDeadline = new Date(data.currentAdminSettings.submissionDeadline);
                data.currentAdminSettings.cachedAt = new Date();
                data.currentAdminSettings.isBeforeDeadline = new Date() < new Date(data.currentAdminSettings.submissionDeadline);
                this.systemSetting = data.currentAdminSettings;
                return Promise.resolve(data.currentAdminSettings);
            });
    }
}

export default systemSettingService;