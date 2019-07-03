"use strict";
const command_1 = require("@oclif/command");
class BiotopeSketcherCli extends command_1.Command {
    async run() {
        this.log('thats me logging info for you!');
    }
}
BiotopeSketcherCli.description = 'It displays a log on the terminal';
module.exports = BiotopeSketcherCli;
