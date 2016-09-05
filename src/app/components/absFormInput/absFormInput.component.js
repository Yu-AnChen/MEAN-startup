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
            this.form = this.getFormTemplate();
            this.autoBackupConfig = {
                status: false,
                time: 1000, // ms
                msg: 'DISABLED' 
            }
            this.addOn = 0;
            this.AuthorAffilTemplate = this.genAuthorAffilTemplate();
            // this.addAuthor(); this.addAuthor();
        }
        submit(){
            console.log(this.form);
            this.fillInAuthorAndAffil(()=>{
                this.decideUseAffiliationSup(()=>{
                    this.saveToDatabase();
                });
            });
        }
        saveToDatabase(){
            console.log('here we are!');
            this.FormApi.save(this.form).then((res)=>{
                console.log(res);
                this.getAbstract('yuan@gmail.com', 'YourTitle');
            });
        }
        getAbstract(email, title) {
            this.FormApi.get(email, title).then((res)=>{
                console.log('get data from server');
                console.log(this.form._id);
                this.form = res.data[0];
                console.log(this.form._id);
            });
        }

        // DATA STRUCTURE
        getFormTemplate() {
            return {
                email: 'yuan@gmail.com',
                title: "Lin-28 Promotes Symmetric Stem Cell Division And Drives Adaptive Growth in The Adult Drosophila Intestine",
                authors: [{"name":"Ching-Huan Chen","role":"Presenting","affiliationSup":[1],"affiliationOfAuthor":["Department of Biology, Indiana University, Bloomington, IN"],"validAuthor":true},{"name":"Arthur Luhur","role":"General","affiliationSup":[null],"affiliationOfAuthor":[""],"validAuthor":true},{"name":"Nicholas Sokol","role":"Corresponding","affiliationSup":[2],"affiliationOfAuthor":["Department of Molecular Biology, Indiana University, Bloomington, IN"],"validAuthor":true}],
                affiliations: ["Department of Biology, Indiana University, Bloomington, IN","Department of Molecular Biology, Indiana University, Bloomington, IN"],
                useAffiliationSup: true,
                keywords: "Lin-28, Symmetric renewal, Intestinal stem cell, Drosophila",
                absContent: "Stem cells switch between asymmetric and symmetric division to expand in number as tissues grow during development and in response to environmental changes. The stem cell intrinsic proteins controlling this switch are largely unknown, but one candidate is the Lin-28 pluripotency factor. A conserved RNA-binding protein that is downregulated in most animals as they develop from embryos to adults, Lin-28 persists in populations of adult stem cells. Its function in these cells has not been previously characterized. Here, we report that Lin-28 is highly enriched in adult intestinal stem cells in the Drosophila intestine. lin-28 null mutants are homozygous viable but display defects in this population of cells, which fail to undergo a characteristic food-triggered expansion in number and have reduced rates of symmetric division as well as reduced insulin signaling. Immunoprecipitation of Lin-28-bound mRNAs identified Insulin-like Receptor (InR), forced expression of which completely rescues lin-28-associated defects in intestinal stem cell number and division pattern. Furthermore, this stem cell activity of lin-28 is independent of one well-known lin-28 target, the microRNA let-7, which has limited expression in the intestinal epithelium. These results identify Lin-28 as a stem cell intrinsic factor that boosts insulin signaling in intestinal progenitor cells and promotes their symmetric division in response to nutrients, defining a mechanism through which Lin-28 controls the adult stem cell division patterns that underlie tissue homeostasis and regeneration.",
                absContentRaw: "",
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
        decideUseAffiliationSup(callback) {
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
                this.form.useAffiliationSup = false;
            } else { 
                this.form.useAffiliationSup = false; 
            }
            callback();
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
        fillInAuthorAndAffil(callback) {
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
            // this.decideUseAffiliationSup();
            callback();
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
                this.autoBackupConfig.msg = 'DISABLED';
                this.$interval.cancel(this.autoBackup);
            } else {
                this.autoBackupConfig.msg = 'Changes saved';
                this.autoBackup = this.$interval(()=>{
                    console.log('save');
                    this.addOn ++;
                    // this.saveToDatabase();
                }, this.autoBackupConfig.time);
            }
            this.autoBackupConfig.status = !this.autoBackupConfig.status;
        }

        
        
    }
};
export default absFormInputComponent;
