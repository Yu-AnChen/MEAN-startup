const appFilters = angular
    .module('app.core.filters', [])
    .filter('label', ()=>{
        // {{item | label: 'Name'}} => Name: {{item}}
        return (input, labelName) =>{
            return labelName + ': ' + input;
        }
    })
    .filter('uniqueArray', ()=>{
        return (inputArray, field)=>{
            
            return newArray;
        }
    })
    .filter('hasValue', ()=> {
      return (inputArray, tagName)=> {
        var filtered = [];
        angular.forEach(inputArray, (el)=> {
          if(el) {
            filtered.push(el);
          }
        });
        return filtered;
      }
    })
    .filter('hasTag', function() {
      return function(items, tagName) {
        var filtered = [];
        angular.forEach(items, function(el) {
          if(el.tags && el.tags.indexOf(tagName)>-1) {
            filtered.push(el);
          }
        });
        return filtered;
      }
    })
    
    .name;

export default appFilters;



