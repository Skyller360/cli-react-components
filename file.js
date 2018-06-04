const fs = require('fs');
const mkdirp = require('mkdirp');
const exec = require('child_process').exec;

module.exports = {
    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        }
    },

    writeFile: (fileName, path, extension) => {
        try  {
            exec(`sed -e 's/App/${fileName}'/g ${__dirname}/template.js`, (err, stdout, stderr) => {
                fs.writeFileSync(`${__dirname}/${path}/${fileName}/${fileName}.js`, stdout);
                fs.writeFileSync(`${__dirname}/${path}/${fileName}/${fileName}.${extension}`, '');
            });
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