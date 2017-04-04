/* @ngInject */
class absFormServiceLocal {
    static get $inject() {
        return ['$timeout', '$document'];
    }
    constructor($timeout, $document) {
        this.$timeout = $timeout;
        this.$document = $document;
    }
    
    sendAbsPrintEl(data) {
        // return this.$http.post('/toPdf/', data);
        return this.$timeout(() => Promise.resolve(), 1000);
    }
    getPdfUrl(email) {
        // return this.$http.get('/toPdf/' + email);
    }
    convertHtmlToDocx(elementId) {
        // $document
        // this.$document[0].getElementById();
        var el = this.$document[0].querySelector(elementId);
        // some custom code for formatting
        var indexForDeletion = el.innerHTML.lastIndexOf("<br>");
        var strForDocx = el.innerHTML.substring(0, indexForDeletion) + 
                            el.innerHTML.substring(indexForDeletion+4);
        var content = '<!DOCTYPE html>'+ `
        <style>
        body {
            font-family: Arial;
            font-size: 14.5px;
            line-height: 25px;
        }
        
        .abs_title {
            font-weight: 600;
            margin-top: 0px;
            margin-bottom: 29px;
            font-size: 14.5px;
        }
        .wrapper-author {
            font-weight: 400;
            margin-bottom: -290px;
        }
        .wrapper-affil {
            font-size: 12.75px;
            margin-top: 0px;
            margin-bottom: 29px;
        }
        .wrapper-keywords {
            font-size: 13px;
            font-style: italic;
            font-weight: 600;
            margin-top: 0px;
            margin-bottom: 14.5px;
        }
        .wrapper-abs-content {
            text-align: justify;
        }
        </style>
        ` + '<body>' + strForDocx + '</body>';
        var converted = htmlDocx.asBlob(content);
        return converted;
    }

    // data = {
    //     email: currentUser.email,
    //     html: element.html
    // }
}

export default absFormServiceLocal;
