const time = require('./time.js');
const chalk = require('chalk');

const log = console.log;

chalk.level = 1; // Use colours in the VS Code Debug Window
log(chalk.yellow('Welcome to the app!'));

function logWithTime(message, value = '') {
    log(
        chalk.bgGreenBright(
            '⚫️ ' + time.getNowAsHH_mm_ss_SSS() + '\n' +
            '\t⚫️ ' + chalk.bold(message.toUpperCase()) + '\n' +
            '\t\t⚫️ ' + value + '\n')
    );
}

module.exports = { withTime: logWithTime, log: logWithTime };

// withTime("Hello World");