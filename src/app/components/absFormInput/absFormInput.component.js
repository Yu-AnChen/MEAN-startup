import template from './absFormInput.html';
import './absFormInput.styl';

const absFormInputComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */ 
    class absFormInputController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$interval', 'FormApi'];
        }
        constructor($log, $timeout, $scope, $interval, FormApi) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$interval = $interval;
            this.FormApi = FormApi;
        }
        $onInit() {
            const fakeData= {
                name: 'someone'
            }
            this.FormApi.updateCounter(1);
            this.FormApi.get('11111', (res)=>{
                console.log(res.data);
            });
            this.FormApi.getAB2('55555').then((res)=>{
                console.log(res.data);
            });
            this.FormApi.update('11111', fakeData, (res)=>{
                console.log(res.data);
            });
            this.FormApi.updateAB2('55555', fakeData).then((res)=>{
                console.log(res.data);
            });
            this.form = this.getFormTemplate();
            this.autoBackupConfig = {
                status: false,
                time: 1000, // ms
                msg: '' 
            }
            this.addOn = 0;
            this.AuthorAffilTemplate = this.genAuthorAffilTemplate();
            this.addAuthor(); this.addAuthor();
        }
        // DATA STRUCTURE
        getFormTemplate() {
            return {
                user_id: 1,
                title: "Your Title",
                authors: [],
                affiliations: [],
                useAffiliationSup: true,
                keywords: [],
                absContent: "<a href='#'>hello world</a>",
                createdAt: new Date(),
                updatedAt: new Date(),
                submittedAt: new Date()
            };
        }
        addAuthor() {
            let newAuthor = {
                name: "",
                role: this.genAuthorAffilTemplate()[this.form.authors.length],
                affiliationSup: [NaN],
                affiliationOfAuthor: [""],
                validAuthor: false
            }
            if (this.form.authors.length < 2) {
                this.form.authors.push(newAuthor);
            } else {
                this.form.authors.splice(this.form.authors.length-1, 0, newAuthor);
            }
        }
        genAuthorAffilTemplate() {
            let AuthorAffilTemplate = ["Presenting", "Corresponding", "General"];
            for (let i=0; i<27; i++) {
                AuthorAffilTemplate.push(AuthorAffilTemplate[2]);
            }
            return AuthorAffilTemplate;
        }
        addAffiliation(authorIndex) {
            this.form.authors[authorIndex].affiliationSup.push(NaN);
        }

        // TOOLS
        genUniqueArray(theArray) {
            let n = {},
              r = [];
            for (let i=0; i<theArray.length; i++) {
                if (!n[theArray[i]]) {
                    n[theArray[i]] = true;
                    r.push(theArray[i]);
                }
            }
            return r;
        }
        filterString(str) {
            // whitespaces have been trimed by angular
            if (str) { return str; }
        }
        
        // AUTHOR AND AFFILIATION
        // this.form.affiliations = [unique affiliations]
        checkAffilUnique() {
            console.log('checking');
            let affilRaw = [];
            for (let i=0; i<this.form.authors.length; i++) {
                affilRaw = affilRaw.concat(this.form.authors[i].affiliationOfAuthor);
            }
            let affilClean = affilRaw.filter(this.filterString);
            let affilUnique = this.genUniqueArray(affilClean);
            
            this.form.affiliations = affilUnique;      
        }
        // match elements in author.affiliationOfAuthor with this.form.affiliations
        // to get the superscript number
        matchAffilSup() {
            for (let j=0; j<this.form.authors.length; j++) {
                for (let k=0; k<this.form.authors[j].affiliationOfAuthor.length; k++) {
                    let num = this.form.affiliations.indexOf(this.form.authors[j].affiliationOfAuthor[k]);
                    if (num>=0) {
                        this.form.authors[j].affiliationSup[k] = num+1;
                    }
                    if (num === -1) {
                        this.form.authors[j].affiliationSup[k] = NaN;
                    }
                }
            }
        }
        // true if the author has name or any affiliation
        validateAuthor() {
            for (let i=0; i<this.form.authors.length; i++) {
                this.form.authors[i].validAuthor = Boolean(
                    this.filterString(this.form.authors[i].name) ||
                    this.form.authors[i].affiliationOfAuthor.filter(this.filterString).length
                    )
            }
        }
        filterValidAuthor(author) {
            return author.validAuthor;
        }
        decideUseAffiliationSup() {
            let validAuthors = this.form.authors.filter(this.filterValidAuthor);
            if (validAuthors.length > 1 && this.form.affiliations.length > 1) {
                for (let i=0; i<validAuthors.length-1; i++) {
                    let supOne = validAuthors[i].affiliationSup.filter(this.filterString).sort();
                    let supTwo = validAuthors[i+1].affiliationSup.filter(this.filterString).sort();
                    if (supOne.length != supTwo.length) { return this.form.useAffiliationSup = true; }
                    else {
                        for ( let j=0; j<supOne.length; j++) {
                            if (supOne[j] !== supTwo[j]) { return this.form.useAffiliationSup = true; }
                        }
                    }
                }
                return this.form.useAffiliationSup = false;
            } else { return this.form.useAffiliationSup = false; }
        }
        matchAuthor(name){
            this.filteredAuthors=[];
            let newfilteredAuthors = [];
            for(let x=0; x<this.form.authors.length; x++){
                this.filteredAuthors.push(this.form.authors[x].name);
            }
            console.log(this.filteredAuthors);
            for(let i=0; i<this.filteredAuthors.length; i++) {
                const pos = this.filteredAuthors[i].indexOf(name);
                if (pos > -1){
                    newfilteredAuthors.push(this.filteredAuthors[i]);
                }
            }
            this.filteredAuthors = newfilteredAuthors;
        }
        fillInAuthorAndAffil() {
            for (let i=0; i<this.form.authors.length; i++) {
                if (this.filterString(this.form.authors[i].name)) {
                    if (!this.form.authors[i].affiliationOfAuthor.filter(this.filterString).length) {
                        this.form.authors[i].affiliationOfAuthor[0] = "Unknown Affiliation";
                        this.checkAffilUnique();
                        this.matchAffilSup();
                    }
                } else {
                    if (this.form.authors[i].affiliationOfAuthor.filter(this.filterString).length) {
                        this.form.authors[i].name = "Unknown Author";
                    }
                }
            }
            this.decideUseAffiliationSup();
        }
        
        // KEYWORDS
        splitKeywords() {
            let splitedWords = this.form.keywords[0].split(",");
            this.form.keywords = 
                [this.form.keywords[0]].concat(splitedWords.map((element) => element.trim()))
        }        
        // DATABASE
        toggleAutoBackup() {
            if (this.autoBackupConfig.status) {
                this.autoBackupConfig.msg = 'stop';
                this.$interval.cancel(this.autoBackup);
            } else {
                this.autoBackupConfig.msg = 'start';
                this.autoBackup = this.$interval(()=>{
                    console.log('save');
                    this.addOn ++;
                    this.saveToDatabase();
                }, this.autoBackupConfig.time);
            }
            this.autoBackupConfig.status = !this.autoBackupConfig.status;
        }
        submit(){
            console.log(this.form);
            this.fillInAuthorAndAffil();
            this.saveToDatabase();
        }
        saveToDatabase(){
            
        }
        
        
    }
};
export default absFormInputComponent;
