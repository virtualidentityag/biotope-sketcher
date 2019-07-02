import {Command} from '@oclif/command'

class BiotopeSketcherCli extends Command {
  static description = 'It displays a log on the terminal'

  async run() {
    this.log('thats me logging info for you!')
  }
}

export = BiotopeSketcherCli
