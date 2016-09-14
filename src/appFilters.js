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
    .name;

export default appFilters;



