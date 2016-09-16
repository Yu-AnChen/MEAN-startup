import template from './absForm.html';
import './absForm.styl';

const absFormComponent = {
    template,
    bindings: {

    },
    controller: /* @ngInject */
    class absFormInputController {
        static get $inject() {
            return ['$log', '$timeout', '$scope', '$interval', 'FormApi', 'UserApi', '$state', 'focus', '$stateParams'];
        }
        constructor($log, $timeout, $scope, $interval, FormApi, UserApi, $state, focus, $stateParams) {
            this.$log = $log;
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$interval = $interval;
            this.FormApi = FormApi;
            this.UserApi = UserApi;
            this.$state = $state;
            this.focus = focus;
            this.$stateParams = $stateParams;
        }
        $onInit() {
            this.buildForm();
            this.getCurrentUser();
            // if (this.mycurrentUser) {
            //     this.form = this.getFormNewUser();
            // } else {
            //     this.form = this.getFormTemplate();
            // }
            // this.form = this.getFormTemplate();
            // this.form = this.getFormNewUser();
            this.fields = this.getFields();
            
            this.autoBackupConfig = {
                status: false,
                time: 2000, // ms
                msg: 'DISABLED'
            }
            // this.currentUser = false;
            this.addOn = 0;
            this.AuthorAffilTemplate = this.genAuthorAffilTemplate();
            // this.addAuthor(); this.addAuthor();
            this.absWithinPage = true;
        }
        $onDestroy() {
            this.$interval.cancel(this.autoBackup);
        }
        
        detectAbsOverflowY(callback) {
            console.log("detectAbsOverflowY");
            var el = document.querySelector("#abs_print");
            if (el.scrollHeight > el.clientHeight) {
               this.absWithinPage = false; 
            } else { this.absWithinPage = true; }
            if (typeof callback === "function") {
                callback();
            }
        }
        buildForm() {
            this.UserApi.getCurrentUser().then((res)=>{
                this.getAbstract(res.data.email);
                // this.currentUser = true;
            },(res)=>{
                this.form = this.getFormNewUser();
                // this.currentUser = false;
            });
        }
        getCurrentUser() {
            this.UserApi.getCurrentUser().then((res)=>{
                // console.log(res.data);
                if (res.data.email) {
                    // this.$state.go('app.absForm', {email: res.data.email});
                    console.log(res.data.email);
                    this.currentUser = res.data;
                    // this.form.email = res.data.email;
                } else { 
                    this.currentUser =false; 
                }
            }, (res)=>{
                this.currentUser = false;
                // if (res.status == 401) {
                //     this.alreadyExist = true;
                //     console.log(res);
                // } else {
                //     console.log('other error');
                // }
            });
        }
        
        submit(){
            console.log("submitting");
            console.log(this.form);
            this.form.submittedAt[0] = new Date();
            this.fillInAuthorAndAffil(()=>{
                this.decideUseAffiliationSup(()=>{
                    this.detectAbsOverflowY(()=>{
                        console.log(this.absWithinPage);
                       if (this.absWithinPage) { 
                           this.saveToDatabase(true); 
                       } 
                    })
                });
            });
            // this.fillInAuthorAndAffil(()=>{
            //     this.saveToDatabase();
                // this.decideUseAffiliationSup(()=>{
                //     this.saveToDatabase();
                // });
            // });
        }
        saveToDatabase(submit){
            this.form.email = this.currentUser.email;
            this.form.updatedAt = new Date();
            this.FormApi.save(this.form).then((res)=>{
                console.log(res);
                if (res.data.ops) {
                    this.getAbstract(res.data.ops[0].email, res.data.ops[0].title);
                }
                if (submit) {
                    this.$state.go('app.absSubmitComplete')
                }
            });
        }
        getAbstract(email, title) {
            this.FormApi.get(email, title).then((res)=>{
                console.log('get data from server');
                // console.log(this.form._id);
                this.form = res.data[0];
                // console.log(this.form._id);
            }, ()=>{
                this.form = this.getFormNewUser();
            });
        }

        saveAndSignUp() {
            // this.FormApi.save(this.form).then((res)=>{
            //     console.log(res.data.ops[0]);
                this.$state.go('app.user.signUp', {unsavedData: this.form})
            // });
        }
        
        // DATA STRUCTURE
        getFormTemplate() {
            return {
                email: 'yuan@gmail.com',
                title: "Lin-28 Promotes Symmetric Stem Cell Division And Drives Adaptive Growth in The Adult Drosophila Intestine",
                field: "",
                authors: [{"name":"Ching-Huan Chen","role":"Presenting","affiliationSup":[1],"affiliationOfAuthor":["Department of Biology, Indiana University, Bloomington, IN"],"validAuthor":true},{"name":"Arthur Luhur","role":"General","affiliationSup":[null],"affiliationOfAuthor":[""],"validAuthor":true},{"name":"Nicholas Sokol","role":"Corresponding","affiliationSup":[2],"affiliationOfAuthor":["Department of Molecular Biology, Indiana University, Bloomington, IN"],"validAuthor":true}],
                affiliations: ["Department of Biology, Indiana University, Bloomington, IN","Department of Molecular Biology, Indiana University, Bloomington, IN"],
                useAffiliationSup: true,
                keywords: "Lin-28, Symmetric renewal, Intestinal stem cell, Drosophila",
                absContent: "Stem cells switch between asymmetric and symmetric division to expand in number as tissues grow during development and in response to environmental changes. The stem cell intrinsic proteins controlling this switch are largely unknown, but one candidate is the Lin-28 pluripotency factor. A conserved RNA-binding protein that is downregulated in most animals as they develop from embryos to adults, Lin-28 persists in populations of adult stem cells. Its function in these cells has not been previously characterized. Here, we report that Lin-28 is highly enriched in adult intestinal stem cells in the Drosophila intestine. lin-28 null mutants are homozygous viable but display defects in this population of cells, which fail to undergo a characteristic food-triggered expansion in number and have reduced rates of symmetric division as well as reduced insulin signaling. Immunoprecipitation of Lin-28-bound mRNAs identified Insulin-like Receptor (InR), forced expression of which completely rescues lin-28-associated defects in intestinal stem cell number and division pattern. Furthermore, this stem cell activity of lin-28 is independent of one well-known lin-28 target, the microRNA let-7, which has limited expression in the intestinal epithelium. These results identify Lin-28 as a stem cell intrinsic factor that boosts insulin signaling in intestinal progenitor cells and promotes their symmetric division in response to nutrients, defining a mechanism through which Lin-28 controls the adult stem cell division patterns that underlie tissue homeostasis and regeneration.",
                createdAt: new Date(),
                updatedAt: new Date(),
                submittedAt: []
            };
        }
        getFormNewUser() {
            return {
                email: '',
                title: "The Title, Ideally in Title Case.",
                field: "",
                authors: [{"name":"Siao-Ming Wang","role":"Presenting","affiliationSup":[1],"affiliationOfAuthor":["Department of Biophysics, University of Texas Southwestern Medical Center, Dallas, TX"],"validAuthor":true},{"name":"Jane Doe","role":"Corresponding","affiliationSup":[2],"affiliationOfAuthor":["Department of Radiology, University of Texas Southwestern Medical Center, Dallas, TX"],"validAuthor":true}],
                affiliations: ["Department of Biophysics, University of Texas Southwestern Medical Center, Dallas, TX","Department of Radiology, University of Texas Southwestern Medical Center, Dallas, TX"],
                useAffiliationSup: true,
                keywords: "keyword, are, seperated, by, comma",
                absContent: "Please read on before you delete the following and paste in your abstract.\n\nIf the bottom part of your abstract doesn't show up, that indicates the content is _too long_. Please trim it. While we are very open to the format, it must be single page print out.\n\nFor multiple paragraphs, place an empty line between every paragraph. So that they will be separated nicely.\n\nMarkdown runs in this box. _Italic text_ and **bold text** are made possible.",
                createdAt: new Date(),
                updatedAt: new Date(),
                submittedAt: []
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
        toTitleCase() {
            const toTitleCase = require('titlecase');
            this.form.title = toTitleCase(this.form.title);
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
            console.log('decideUseAffiliationSup');
            let validAuthors = this.form.authors.filter(this.filterValidAuthor);
            if (validAuthors.length > 1 && this.form.affiliations.length > 1) {
                this.form.useAffiliationSup = false;
                for (let i=0; i<validAuthors.length-1; i++) {
                    let supOne = validAuthors[i].affiliationSup.filter(this.filterString).sort();
                    let supTwo = validAuthors[i+1].affiliationSup.filter(this.filterString).sort();
                    if (supOne.length != supTwo.length) { this.form.useAffiliationSup = true; break; }
                    else {
                        for ( let j=0; j<supOne.length; j++) {
                            if (supOne[j] !== supTwo[j]) { this.form.useAffiliationSup = true; break; }
                        }
                        // 
                    }
                }
                // 
                // this.form.useAffiliationSup = false;
            
                
                
            } else {
                this.form.useAffiliationSup = false;
            }
            if (typeof callback == "function") {
                callback();
            }
            
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
            console.log('fillInAuthorAndAffil');
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
            if (typeof callback == "function") {
                callback();
            }
        }
        // FIELDS
        getFields() {
            return [
                "Translational biology", 
                "Developmental biology", 
                "Neuroscience", 
                "Bioinformatics", 
                "Bioengineering", 
                "Biostatistics", 
                "Immunology", 
                "Molecule biology", 
                "Microbiology", 
                "Genetics", 
                "Biophysics", 
                "Biochemistry", 
                "Pharmacology"
            ]
        }
        // // KEYWORDS
        // splitKeywords() {
        //     let splitedWords = this.form.keywords[0].split(",");
        //     this.form.keywords =
        //         [this.form.keywords[0]].concat(splitedWords.map((element) => element.trim()))
        // }
        // DATABASE
        toggleAutoBackup() {
            if (this.autoBackupConfig.status) {
                this.autoBackupConfig.msg = 'Changes saved';
                this.autoBackup = this.$interval(()=>{
                    console.log('save');
                    this.addOn ++;
                    this.saveToDatabase(false);
                }, this.autoBackupConfig.time);
            } else {
                this.autoBackupConfig.msg = 'DISABLED';
                this.$interval.cancel(this.autoBackup);
            }
        }
        goSignUp() {
            this.$state.go('app.user.signIn');
        }
        // UI
        focusNewAuthor() {
            this.focus('author-name-'+(this.form.authors.length-2));
        }
        focusNewAffiliation(authorIndex) {
            console.log(authorIndex);
            this.focus('author-'+authorIndex+'-affiliation-'+(this.form.authors[authorIndex].affiliationSup.length-1))
            // 'author-'+parentIndex+'-affiliation-'+(this.form.authors[parentIndex].affiliationSup.length-2)
        }

    }
};
export default absFormComponent;
