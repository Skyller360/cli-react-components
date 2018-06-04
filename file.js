const fs = require('fs');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;
const shell = require('shelljs');

module.exports = {
    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    writeFile: (fileName, path, extension) => {
        try {
            const result = shell.sed('App', fileName, 'template.js');
            fs.writeFileSync(`${__dirname}/${path}/${fileName}/${fileName}.js`, result.stdout);
            fs.writeFileSync(`${__dirname}/${path}/${fileName}/${fileName}.${extension}`, '');
        } catch (e) {
            console.log('error', e);
        }
    },

    createDirectory: (path, name) => {
        mkdirp(`${__dirname}/${path}/${name}`, (err) => {
            if (err) throw err;
        });
    }
};