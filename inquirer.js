const inquirer = require('inquirer');
const files = require('./file');

module.exports = {

    askComponentName: (params) => {
        let questions = [];
        if (params.name) {
            if (!params.style || (params.style !== 'scss' && params.style !== 'css')) {
                questions = [
                    ...questions,
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
                    }
                ]
            }
            if (!params.path) {
                questions = [
                    ...questions,
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
                ]
            }
            if (questions.length === 0) {
                return;
            }
        } else {
            questions = [
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
        }
        return inquirer.prompt(questions);
    },
}