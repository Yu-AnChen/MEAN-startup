/* 
    $resource 
    https://docs.angularjs.org/api/ngResource/service/$resource

    { 'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'} };
      
    $http.get
    $http.head
    $http.post
    $http.put
    $http.delete
    $http.jsonp
    $http.patch

*/

class formApiService {
    static get $inject() {
        return ['$resource','$http'];
    }
    constructor($resource, $http) {
        this.abstract = $resource('/abstract/:email', 
                            {email: '@email'}, 
                            {   
                                'update': { method:'PUT' },
                                'post': {method: 'POST'}
                            }
                            );
        this.abstracts = $resource('/abstracts/');
        this.$http = $http;
    }
    
    getAbstracts() {
        return this.$http.get('/abstracts');
    }
    
    get(email, title) {
        const _title = title || '';
        return this.$http.get('/abstract/'+email+'?title='+_title);
    }
    
    save(data) {
        return this.$http.put('/abstract/', data);
    }
    update(absId, updateData) {
        return this.$http.put('/abstract/' + absId, updateData);
    }
    // updateEmail(absId, data) {
    //     return this.$http.put('/abstract/' + absId, data);
    // }
    // updateTalkStatus(absId, data) {
    //     return this.$http.put('/abstract/' + absId, data);
    // }
    
    delete(_id) {
        return this.$http.delete('/abstract/' + _id);
    }
}

export default formApiService;
