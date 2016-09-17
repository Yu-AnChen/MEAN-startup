const absFormConstant = {
    // for web metadatas
    researchFields: [
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
    ],
    abstractNewUser: {
        email: "",
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
    },
    
};

module.exports = absFormConstant;
