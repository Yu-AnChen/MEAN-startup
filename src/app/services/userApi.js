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

class userApiService {
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
    
    getUsers() {
        return this.$http.get('/users');
    }
    getCurrentUser() {
        return this.$http.get('/currentUser');
    }
    signup(json) {
        return this.$http.post('/user/signup', json);
    }
    signin(json) {
        return this.$http.post('/user/signin', json);
    }
    signout(json) {
        return this.$http.delete('/user/signout', json);
    }
    get(email) {
        return this.$http.put('/user/' + email);
    }
    update(json) {
        return this.$http.put('/user', json);
    }
    delete(email) {
        return this.$http.delete('/user/', + email);
    }
    
}

export default userApiService;
