import template from './absPrint.html';
import './absPrint.styl';

const absPrintComponent = {
    
    template,
    bindings: {
        absData: '<',  // <print-out abs-data="$ctrl.absData"></print-out>
    },
    controller:
    /* @ngInject */
    class printOutController {
        static get $inject() {
            return ['$log', '$timeout', '$scope'];
        }
        constructor($log, $timeout, $scope) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
        }
        $onInit(){
            // this.absData = this.getAbsData(); // this.data == $ctrl.asbData
            // this.abstract = this.parseMarkdown("*hello*");
        }
        $onChanges(changes){
            console.log(changes);
            // console.log(this.absData);
        }
        $onDestroy(){}
        $postLink(){}
        
        
        // KEYWORDS
        splitKeywords(string) {
            let splitedWords = string.split(",");
            return splitedWords.map((element) => element.trim());
        }
        // ABSTRACT
        parseMarkdown(string) {
            const marked = require("marked");
            return marked(string);
        }
        
        // filterValidAuthor(val) {
        //     if (
        //         this.filterString(val.name) || 
        //         val.affiliationOfAuthor.filter(this.filterString).length 
        //     ) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        
    
        // getAbsData() {
        //     var absData = {
        //         user_id: 1,
        //         title: "My First Abstract",
        //         authors: [{
        //             name: "John Doe",
        //             role: "presenting",
        //             affiliationSup: [1, 2]
        //         }, {
        //             name: "Jane Doe",
        //             role: "corresponding",
        //             affiliationSup: [1]
        //         }],
        //         affiliations: [{
        //             id: 1,
        //             name: "Department of Biophysics, University of Texas Southwestern Medical Center, Dallas,   TX"
        //         }, {
        //             id: 2,
        //             name: "TSA, Taiwan!"
        //         }],
        //         keywords: ["keywords", "by", "comma"],
        //         absContent: "<HTML>",
        //         createdAt: new Date(),
        //         updatedAt: new Date(),
        //         submittedAt: new Date()
        //     };
        //     return absData; 
        // }


    }
};
export default absPrintComponent;
