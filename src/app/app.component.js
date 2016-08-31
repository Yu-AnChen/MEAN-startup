import './app.styl';
// import template from './app.html';

const appComponent = {
    template: `
    <div class="container-fluid">
        <abs-form-input></abs-form-input>
    </div>
    `,
    controller: /* @ngInject */ 
    class AppController {
        static get $inject() {
            return ['$timeout', 'METADATA'];
        }
        constructor($timeout, METADATA) {
            this.$timeout = $timeout;
            this.METADATA = METADATA;
        }
        $onInit(){
            this.message = 'Hello~';
            this.$timeout(()=>{
                this.message += 'World';
            },1500);
            
            this.absData = this.getAbsData();
        }
        
        getAbsData() {
            var absData = {
                user_id: 1,
                title: "My First Abstract new stuff",
                authors: [{
                    name: "John Doe",
                    role: "presenting",
                    affiliationSup: [1, 2]
                }, {
                    name: "Jane Doe",
                    role: "corresponding",
                    affiliationSup: [1]
                }, {
                    name: "Author Three",
                    role: "general",
                    affiliationSup: [1]
                }],
                affiliations: [{
                    id: 1,
                    name: "Department of Biophysics, University of Texas Southwestern Medical Center, Dallas,   TX"
                }, {
                    id: 2,
                    name: "TSA, Taiwan!"
                }],
                useAffiliationSup: true,
                keywords: ["keywords", "are", "seperated", "by", "comma"],
                absContent: "<a href='#'>hello world</a>",
                createdAt: new Date(),
                updatedAt: new Date(),
                submittedAt: new Date()
            };
            return absData; 
        }
    },
};

export default appComponent;
