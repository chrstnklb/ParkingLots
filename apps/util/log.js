const time = require('./time.js');
const chalk = require('chalk');

const log = console.log;

chalk.level = 1; // Use colours in the VS Code Debug Window
// log(chalk.yellow('Welcome to the app!'));

function logWithTime(message, value = '') {
    log(
        chalk.bgGreenBright(
            '⚫️ ' + time.getNowAsHH_mm_ss_SSS() + '\n' +
            '\t⚫️ ' + message + '\n' +
            ((value.length > 0)
                ? ('\t\t⚫️ ' + value)
                : ('')) + '\n'
        )
    );
}



module.exports = { log: logWithTime };

// withTime("Hello World");