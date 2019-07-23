import {Command} from '@oclif/command'
const { openPage, processPage } = require('./crawler/page');

class BiotopeSketcherCli extends Command {
  static description = 'It converts a Biotope Styleguide to almostSketch.json'

  async run() {
    openPage(process.argv[2])
      .then(processPage('./dist/'))
      .catch((error: string) => {
        console.error(error);
        process.exit(-1);
      });
  }
}

export = BiotopeSketcherCli
