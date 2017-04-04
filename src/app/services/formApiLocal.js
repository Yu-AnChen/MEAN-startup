class formApiService {
    static get $inject() {
        return ['$window'];
    }
    constructor($window) {
        this.$window = $window;
        this.storageKey = 'flowThroughAbstracts';
        this.storage = this.$window.localStorage;
        this.abstracts;
    }
    
    getAbstracts() {
        // return this.$http.get('/abstracts');
        this.setAbstracts();

        let res = {};

        res.status = 200;
        res.data = this.abstracts;
        return Promise.resolve(res);
    }
    setAbstracts() {
        if (this.abstracts) return;

        let abstracts;
        abstracts = JSON.parse(this.storage.getItem(this.storageKey));
        
        if(!abstracts) {
            abstracts = require('./sampleAbstracts');
            this._saveToLocalStorage(abstracts);
        }
        return this.abstracts = abstracts;
    }
    _saveToLocalStorage(data) {
        return this.storage.setItem(this.storageKey, JSON.stringify(data));
    }
    get(email, title) {
        // const _title = title || '';
        // return this.$http.get('/abstract/'+email+'?title='+_title);
        this.setAbstracts();

        let res = {};
        let abstract;
        abstract = this.abstracts.find(element => element.email == email);
        if (!abstract) {
            res.status = 400;
            return Promise.reject(res);
        }
        res.status = 200;
        res.data = [abstract];
        return Promise.resolve(res);
    }
    
    save(data) {
        // return this.$http.put('/abstract/', data);
        this.setAbstracts();

        let res = {};
        // create
        if (!data._id) {
            data._id = data.email;
            this.abstracts.push(data);
            this._saveToLocalStorage(this.abstracts);
            res.data = { ops: [data] };
            res.status = 200;
            return Promise.resolve(res);
        }
        // update
        let indexOfTargetAbstract;
        indexOfTargetAbstract = this.abstracts.findIndex(element => element._id == data._id);
        if (indexOfTargetAbstract === -1) 
            return reject('cannot find abstract in db');
        this.abstracts[indexOfTargetAbstract] = data;
        this._saveToLocalStorage(this.abstracts);
        res.status = 200;
        res.data = data;
        return Promise.resolve(res);
    }
    // update(absId, updateData) {
    //     return this.$http.put('/abstract/' + absId, data);
    // }
    // updateEmail(absId, data) {
    //     return this.$http.put('/abstract/' + absId, data);
    // }
    updateTalkStatus(absId, data) {
        this.setAbstracts();

        let res = {};
        if (!absId || !data || data.selectedForTalk === undefined)
            return reject('bad request');
        let indexOfTargetAbstract;
        indexOfTargetAbstract = this.abstracts.findIndex(element => element._id == absId);
        if (indexOfTargetAbstract === -1) 
            return reject('cannot find abstract in db');
        this.abstracts[indexOfTargetAbstract]['selectedForTalk'] = data.selectedForTalk;
        this._saveToLocalStorage(this.abstracts);
        res.status = 200;
        return Promise.resolve(res);
    }
    
    // delete(_id) {
    //     return this.$http.delete('/abstract/' + _id);
    // }
}

export default formApiService;
