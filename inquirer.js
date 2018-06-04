const inquirer = require('inquirer');
const files = require('./file');

module.exports = {

    askComponentName: () => {
        const questions = [
            {
                name: 'name',
                type: 'input',
                message: 'Enter component name',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your component name';
                    }
                }
            },
            {
                name: 'style',
                type: 'list',
                message: 'Do you want css or scss ?',
                choices: ['scss', 'css'],
                validate: function (value) {
                    if (value.length) {
                        return true;
                    }
                }
            },
            {
                name: 'path',
                type: 'input',
                message: 'In which folder do you want to create it ?',
                default: 'src',
                validate: function (value) {
                    if (value.length) {
                        return true;
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },
}