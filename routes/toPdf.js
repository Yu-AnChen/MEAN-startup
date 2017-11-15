const ToPdf = require('express').Router();
const html5pdf = require('html5-to-pdf');
const fs = require('fs');
const path = require('path');
const Auth = require('./auth');

const filePrefix = 'Taiwan-TBA_Year-End_Symposium_2017-';

ToPdf.post('/', Auth, (req, res) => {
    const pdfsDirPath = path.join(__dirname, '../dist/pdfs/');
    try {
        fs.accessSync(pdfsDirPath);
    } catch (e) {
        fs.mkdirSync(pdfsDirPath);
    }
    // https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode
    
    const fileName = filePrefix + req.body.email + '.pdf';
    const pdfPath = pdfsDirPath + fileName;

    const cssPath = path.join(__dirname, './toPdf.css');
    const html5pdfOptions = {
        cssPath: cssPath,
        paperFormat: 'Letter',
        paperBorder: '38px',
    };

    html5pdf(html5pdfOptions)
        .from.string(req.body.html)
        .to(pdfPath, () => {
            // console.log("Created", outputPath)
            fs.stat(pdfPath, function (err, stat) {
                if (err == null) {
                    console.log('File exists');
                    const linkURL = req.protocol + '://' + req.hostname + '/pdfs/' + fileName;
                    console.log(linkURL);
                    res.status(200).send(linkURL);
                } else if (err.code == 'ENOENT') {
                    // file does not exist
                    console.log('File missing');
                    res.status(403).send('cannot create pdf file');
                    // fs.writeFile('log.txt', 'Some log\n');
                } else {
                    console.log('Some other error: ', err.code);
                    res.status(403).send('cannot create pdf file');
                }
            });
        });
});

ToPdf.get('/:email', (req, res) => {
    const fileName = filePrefix + req.params.email + '.pdf';
    const linkURL = req.protocol + '://' + req.hostname + '/pdfs/' + fileName;
    res.status(200).send(linkURL);
});

module.exports = ToPdf;
