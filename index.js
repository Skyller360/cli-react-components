#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./file');
const inquirer = require('./inquirer');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('Create Component', { horizontalLayout: 'full' })
    )
);

const run = async () => {
    let componentInfo = handleParams(process.argv);
    componentInfo = {
        ...componentInfo,
        ...await inquirer.askComponentName(componentInfo)
    };
    if (files.directoryExists(`${__dirname}/${componentInfo.path}`) && files.directoryExists(`${__dirname}/${componentInfo.path}/${componentInfo.name}`)) {

        console.log(chalk.blue('Directory exist'));

        console.log(chalk.blue('Creating', componentInfo.name, 'js and', componentInfo.style, 'files'));
        files.writeFile(componentInfo.name, componentInfo.path, componentInfo.style);
        console.log(chalk.green('Done !'));
    } else {

        console.log(chalk.blue('Creating directory', componentInfo.path, componentInfo.name));

        const callback = () => {
            console.log(chalk.green('Directory', componentInfo.name, 'created !'));

            console.log(chalk.blue('Creating', componentInfo.name, 'js and', componentInfo.style, 'files'));
            files.writeFile(componentInfo.name, componentInfo.path, componentInfo.style);
            console.log(chalk.green('Done !'));
        };
        files.createDirectory(componentInfo.path, componentInfo.name, callback);

    }
}

const handleParams = (params) => {
    if (params.length < 2) {
        return;
    } else {
        const name = params[2];
        const style = params[3];
        const path = params[4];
        return {name, style, path};
    }
}

run();