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
    const componentInfo = await inquirer.askComponentName();
    if (files.directoryExists(`${__dirname}/${componentInfo.path}`) && files.directoryExists(`${__dirname}/${componentInfo.path}/${componentInfo.name}`)) {

        console.log(chalk.blue('Directory exist'));
        files.writeFile(componentInfo.name, componentInfo.style);
    } else {

        console.log(chalk.blue('Creating directory', componentInfo.path, componentInfo.name));
        files.createDirectory(componentInfo.path, componentInfo.name);
        console.log(chalk.green('Directory', componentInfo.name, 'created !'));

        console.log(chalk.blue('Creating', componentInfo.name, 'js and', componentInfo.style, 'files'));
        files.writeFile(componentInfo.name, componentInfo.path, componentInfo.style);
        console.log(chalk.green('Done !'));
    }
}

run();