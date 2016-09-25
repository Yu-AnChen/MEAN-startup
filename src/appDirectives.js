var INTEGER_REGEXP = /^\-?\d+$/;
const appDirectives = angular
    .module('app.core.directives', [])
    .directive('interger', ()=>{
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
              ctrl.$validators.integer = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                  // consider empty models to be valid
                  return true;
                }
        
                if (/^\-?\d+$/.test(viewValue)) {
                  // it is valid
                  return true;
                }
        
                // it is invalid
                return false;
              };
            }
        };
    })
    .directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
				var me = attrs.ngModel;
				var matchTo = attrs.pwCheck;
                //console.log(ctrl.constructor.prototype)      
				scope.$watchGroup([me, matchTo], function(value){
					ctrl.$setValidity('pwmatch', value[0] === value[1] );
				});

            }
        };
    }])
    .directive('eventFocus', function(focus) {
        return function(scope, elem, attr) {
            elem.on(attr.eventFocus, function() {
                focus(attr.eventFocusId);
            });
      
        // Removes bound events in the element itself
        // when the scope is destroyed
            scope.$on('$destroy', function() {
               elem.off(attr.eventFocus);
            });
        };
    })
    // .directive('updateTitle', ['$rootScope', '$timeout',
    //   function($rootScope, $timeout) {
    //     return {
    //       link: function(scope, element) {
    
    //         var listener = function(event, toState) {
    
    //           var title = 'Default Title';
    //           if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;
    
    //           $timeout(function() {
    //             element.text(title);
    //           }, 0, false);
    //         };
    
    //         $rootScope.$on('$stateChangeSuccess', listener);
    //       }
    //     };
    //   }
    // ])
    // .directive('title', ['$rootScope', '$timeout',
    //   function($rootScope, $timeout) {
    //     return {
    //       link: function() {
    
    //         var listener = function(event, toState) {
    
    //           $timeout(function() {
    //             $rootScope.title = 'myTitle'
    //             $rootScope.title = (toState.data && toState.data.pageTitle) 
    //             ? toState.data.pageTitle 
    //             : 'Default title';
    //           });
    //         };
    
    //         $rootScope.$on('$stateChangeSuccess', listener);
    //       }
    //     };
    //   }
    // ])
    .name;
export default appDirectives;