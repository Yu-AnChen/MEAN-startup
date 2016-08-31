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
        // '/abs/'  => req.params.userId
        // '/ab/:userId'  => req.params.userId
        this.apiUrlForAB = '/ab/'
        this.apiUrlForABs = '/abs/'
        
        this.AB = $resource(this.apiUrlForAB+':userId', 
                            {userId:'@id'}, 
                            {   
                                'update': { method:'PUT' },
                                'post': {method: 'POST'}
                            }
                            );
        this.ABs = $resource(this.apiUrlForABs);
        this.$http = $http;
    }
    get(userId){
        // $resource
        return this.AB.get({userId: userId});
    }
    getAB2(userId){
        return this.$http.get(this.apiUrlForABs + userId);
    }
    update(userId, data){
        // $resource
        return this.AB.update({userId: userId}, data);
    }
    updateAB2(userId, data){
        return this.$http.put(this.apiUrlForABs + userId, data);
    }
    
    updateCounter(number) {
        console.log(number);
    }
}

export default formApiService;

// class formApiService2 {
//         static get $inject() {
//             return [];
//         }
//         constructor() {
//         }
// }
// export {formApiService, formApiService2};
// function formApiService($log, $timeout, $scope) {
// }
// formApiService.$inject = ['$log', '$timeout', '$scope']