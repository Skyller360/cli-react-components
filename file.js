const fs = require('fs');
const mkdirp = require('mkdirp');
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
            const result = shell.sed('App', fileName, `${__dirname}/template.js`);
            fs.writeFileSync(`${process.cwd()}/${path}/${fileName}/${fileName}.js`, result.stdout);
            fs.writeFileSync(`${process.cwd()}/${path}/${fileName}/${fileName}.${extension}`, '');
        } catch (e) {
            console.log('error', e);
        }
    },

    createDirectory: (path, name, callback) => {
        return new Promise((res, err) => {
            mkdirp(`${process.cwd()}/${path}/${name}`, (err) => {
                if (err) throw err;
                callback();
            });
        })
    }
};